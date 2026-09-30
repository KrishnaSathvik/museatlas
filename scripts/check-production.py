# Run after npm run build and npm run start -- --port 3105. Requires Python 3.
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import os, urllib.request, urllib.error, xml.etree.ElementTree as ET,json
base=os.environ.get('CHECK_BASE_URL','http://localhost:3105').rstrip('/');origin=os.environ.get('NEXT_PUBLIC_SITE_URL','https://www.museatlas.app').rstrip('/')
class Page(HTMLParser):
 def __init__(self):super().__init__();self.canonical=None;self.robots='';self.og=[];self.h1=0;self.main=0;self.icons=[];self.img=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
  if t=='link' and a.get('rel')=='icon':self.icons.append(a.get('href'))
  if t=='meta' and a.get('name')=='robots':self.robots=a.get('content','')
  if t=='meta' and a.get('property')=='og:image':self.og.append(a['content'])
  if t=='h1':self.h1+=1
  if t=='main':self.main+=1
  if t=='img':self.img.append(a['src'])
def get(path):
 try:
  with urllib.request.urlopen(base+path,timeout=30) as r:return r.status,r.read(),r.headers
 except urllib.error.HTTPError as e:return e.code,e.read(),e.headers
status,body,_=get('/sitemap.xml');assert status==200
urls=[e.text for e in ET.fromstring(body).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')];assert len(urls)==34
assets=set()
for url in urls:
 assert url.startswith(origin+'/'),url
 status,body,_=get(url[len(origin):]);assert status==200,(url,status)
 p=Page();p.feed(body.decode());assert p.canonical.rstrip("/")==url.rstrip("/"),(url,p.canonical);assert 'noindex' not in p.robots and 'index' in p.robots,(url,p.robots)
 assert p.h1==1 and p.main==1,(url,p.h1,p.main)
 assert p.og and all(x.startswith(origin+'/') for x in p.og),(url,p.og)
 assets.update(x[len(origin):] for x in p.og);assets.update(p.icons)
for path in assets:
 status,body,_=get(path);assert status==200 and len(body)>0,(path,status)
status,body,_=get('/robots.txt');assert status==200 and (origin+'/sitemap.xml').encode() in body
for path in ['/missing-page','/explore/missing','/use-cases/missing','/examples/missing']:
 status,_,_=get(path);assert status==404,(path,status)
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args):return None
opener=urllib.request.build_opener(NoRedirect)
manifest=json.loads(Path('.next/routes-manifest.json').read_text());count=0
for r in manifest['redirects']:
 if r['source'].startswith('/:'):continue
 source=r['source'].replace(':path*','spark');dest=r['destination'].replace(':path*','spark')
 try:opener.open(base+source)
 except urllib.error.HTTPError as e:
  assert e.code==308,(source,e.code)
  assert e.headers['Location']==dest,(source,e.headers['Location'],dest)
  count+=1
 else:raise AssertionError('Missing redirect '+source)
status,body,headers=get('/_next/image?url=%2Fbrand%2Fmuse-icon.png&w=96&q=75');assert status==200 and headers.get('Content-Type','').startswith('image/'),status
print(f'PASS: {len(urls)} canonical pages, headings/main landmarks, production indexing, {len(assets)} social/icon assets, robots/sitemap, 4 invalid routes, {count} redirects, image optimization.')
