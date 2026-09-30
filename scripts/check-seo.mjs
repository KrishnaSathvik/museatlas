import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const root = process.cwd();
const require = createRequire(import.meta.url);
// Isolated environment cases: no production configuration or credentials are changed.
function loader(env) {
  const cache = new Map();
  function load(file) {
    const path = resolve(root, file);
    if (cache.has(path)) return cache.get(path).exports;
    const loadedModule = { exports: {} };
    cache.set(path, loadedModule);
    const code = ts.transpileModule(readFileSync(path, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
      fileName: path,
    }).outputText;
    const localRequire = specifier => {
      if (!specifier.startsWith('@/') && !specifier.startsWith('.')) return require(specifier);
      const base = specifier.startsWith('@/') ? resolve(root, 'src', specifier.slice(2)) : resolve(dirname(path), specifier);
      const target = [base, `${base}.ts`, `${base}.tsx`].find(existsSync);
      assert.ok(target, `Cannot resolve ${specifier}`);
      return load(target);
    };
    vm.runInNewContext(code, { module: loadedModule, exports: loadedModule.exports, require: localRequire, process: { env }, URL }, { filename: path });
    return loadedModule.exports;
  }
  return load;
}

const production = { NODE_ENV: 'production', NEXT_PUBLIC_SITE_URL: 'https://seo-fixture.invalid', VERCEL_ENV: 'production' };
const load = loader(production);
const { seoPages } = load('src/lib/seo.ts');
const site = load('src/lib/site.ts');
const { PageSchema } = load('src/components/seo/PageSchema.tsx');
assert.equal(seoPages.length, 34);
for (const field of ['path', 'title', 'description']) {
  assert.equal(new Set(seoPages.map(page => page[field])).size, seoPages.length, `Duplicate ${field}`);
}
for (const page of seoPages) {
  assert.ok(page.title && page.description);
  assert.ok(existsSync(resolve(root, 'public', page.image.slice(1))), `Missing social image: ${page.path}`);
  const meta = site.pageMetadata(page.path);
  assert.equal(meta.alternates.canonical, `https://seo-fixture.invalid${page.path}`);
  assert.equal(meta.openGraph.url, meta.alternates.canonical);
  assert.equal(meta.openGraph.images[0].url, meta.twitter.images[0].url);
  assert.ok(meta.openGraph.images[0].alt);
  const schema = JSON.parse(PageSchema({ path: page.path }).props.dangerouslySetInnerHTML.__html);
  if (page.path === '/') {
    assert.equal(schema['@type'], 'WebSite');
    assert.equal(schema.url, meta.alternates.canonical);
  } else {
    assert.equal(schema['@type'], 'BreadcrumbList');
    assert.equal(schema.itemListElement.at(-1).item, meta.alternates.canonical);
    schema.itemListElement.forEach((item, index) => {
      assert.ok(item.name);
      assert.equal(item.position, index + 1);
      assert.ok(seoPages.some(candidate => `https://seo-fixture.invalid${candidate.path}` === item.item));
    });
  }
}
const serialized = PageSchema({ path: '/explore/spark', name: '</script><img>' }).props.dangerouslySetInnerHTML.__html;
assert.ok(!serialized.includes('<'));
assert.equal(load('src/app/sitemap.ts').default().length, 34);
assert.equal(load('src/app/robots.ts').default().sitemap, 'https://seo-fixture.invalid/sitemap.xml');

for (const env of [
  {}, { NODE_ENV: 'production' },
  { ...production, NODE_ENV: 'development' },
  { ...production, VERCEL_ENV: 'preview' },
  { ...production, VERCEL_ENV: 'development' },
  { ...production, SITE_NOINDEX: 'true' },
  ...['http://localhost:3002', 'http://127.0.0.1', 'http://[::1]', 'https://example.com', 'https://project.local'].map(url => ({ ...production, NEXT_PUBLIC_SITE_URL: url })),
]) {
  const test = loader(env);
  assert.equal(test('src/lib/site.ts').SITE_INDEXABLE, false);
  assert.equal(test('src/app/sitemap.ts').default().length, 0);
  assert.equal(test('src/app/robots.ts').default().sitemap, undefined);
}
assert.equal(loader({ NODE_ENV: 'production' })('src/lib/site.ts').pageMetadata('/').alternates, undefined);
for (const url of ['https://domain.invalid/subpath', 'ftp://domain.invalid', 'https://user:pass@domain.invalid', 'invalid']) {
  assert.throws(() => loader({ ...production, NEXT_PUBLIC_SITE_URL: url })('src/lib/site.ts'));
}
const redirects = await load('next.config.ts').default.redirects();
for (const source of ['/models/:path*', '/projects/:path*', '/security', '/resources']) {
  assert.ok(redirects.some(rule => rule.source === source && rule.permanent));
}
for (const rule of redirects) {
  assert.ok(!/^\/(models|projects|security)(\/|$)/.test(rule.destination), `Redirect chain: ${rule.source}`);
}
console.log(`SEO checks pass: ${seoPages.length} canonical pages; unique metadata, social assets, schema, redirects, and production/preview indexing rules.`);
