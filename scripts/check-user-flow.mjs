import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
const root = process.cwd();
const require = createRequire(import.meta.url);
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

const load = loader({});
const { searchGuide } = load('src/lib/search.ts');
const expectations = [
  ['what is muse', '/'], ['What is Meta Muse?', '/'],
  ['what can muse do', '/use-cases'], ['what can meta muse do?', '/use-cases'],
  ['privacy', '/safety'], ['approval', '/safety#permissions'], ['permissions', '/safety#permissions'],
  ['muse', '/explore/muse'], ['spark', '/explore/spark'], ['glimmer', '/explore/glimmer'], ['code', '/explore/code'],
  ['Muse Voice Transcribe', '/explore/voice'], ['pricing', '/explore/muse#specifications'],
  ['voice pricing', '/explore/voice#specifications'], ['spark pricing', '/explore/spark#specifications'],
  ['is muse free?', '/explore/muse#specifications'], ['free', '/explore/muse#specifications'], ['how to start', '/#sources'],
  ['code pricing', '/explore/code#specifications'], ['image pricing', '/explore/image#specifications'],
  ['small business', '/use-cases/business-workflows'], ['artifacts', '/explore/muse'], ['memory', '/explore/muse'],
  ['tokens', '/explore/spark'], ['spar', '/explore/spark'], ['priv', '/safety'], ['   PRIVACY  ', '/safety'],
];
for (const [query, expected] of expectations) {
  const hits = searchGuide(query);
  assert.equal(hits[0]?.href, expected, `Top result for ${query}`);
  assert.equal(new Set(hits.map(hit => hit.href)).size, hits.length, `Duplicate result for ${query}`);
  assert.ok(hits.every(hit => hit.href.startsWith('/')), 'Sources must stay in the footer');
  console.log(`${query} → ${hits[0].href}`);
}
assert.ok(!searchGuide('spark pricing')[0].hint.includes('transcription'));
assert.ok(searchGuide('code pricing')[0].hint.includes('$5/month'));
assert.equal(searchGuide('zzzz-no-matches-12345').length, 0);
assert.deepEqual(searchGuide('  '), searchGuide(''));
assert.ok(searchGuide('free').every(hit => hit.href === '/#sources' || hit.group === 'Product specifications'));
const { productGuide } = load('src/data/product-guide.ts');
const { models } = load('src/data/models.ts');
const { additionalProducts } = load('src/data/products.ts');
const { projects } = load('src/data/projects.ts');
const { seoPages } = load('src/lib/seo.ts');
assert.deepEqual(Array.from(productGuide.code.examples), ['parallel-worktrees', 'scheduled-monitoring']);
for (const slug of productGuide.code.examples) {
  assert.ok(projects.find(project => project.slug === slug).stack.some(tool => tool.startsWith('Muse Code')));
}
for (const product of [...models, ...additionalProducts]) {
  const guide = productGuide[product.slug];
  assert.ok(guide, `Missing editorial relationships: ${product.slug}`);
  assert.ok(guide.examples.every(slug => projects.some(project => project.slug === slug)));
  const links = [...guide.related.map(link => link.href), guide.task.href, ...guide.examples.map(slug => `/examples/${slug}`)];
  assert.equal(new Set(links).size, links.length, `Duplicate relationship for ${product.slug}`);
  for (const href of links) assert.ok(seoPages.some(page => page.path === href.split('#')[0]), `Missing destination: ${href}`);
}
console.log('Search and product relationship checks pass.');
