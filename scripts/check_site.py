"""Check the actual Jekyll output for broken routes and metadata regressions."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys
import xml.etree.ElementTree as ET

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.ids = set()
        self.meta = {}
        self.canonical = []
        self.h1s = 0
        self.mains = 0
        self.image_sources = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'h1': self.h1s += 1
        if tag == 'main': self.mains += 1
        if tag == 'meta':
            self.meta[attrs.get('name') or attrs.get('property')] = attrs.get('content')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical.append(attrs.get('href'))
        if tag == 'a' and attrs.get('href'): self.links.append(attrs['href'])
        if tag in ('img', 'script') and attrs.get('src'): self.links.append(attrs['src'])
        if tag == 'link' and attrs.get('href'): self.links.append(attrs['href'])
        if tag == 'img':
            assert attrs.get('alt'), 'Image is missing alt text'
            for candidate in attrs.get('srcset', '').split(','):
                if candidate.strip(): self.links.append(candidate.strip().split()[0])

root = Path(sys.argv[1] if len(sys.argv) > 1 else '_site').resolve()
assert (root / 'index.html').exists(), 'Jekyll output is missing'
expected = ['index.html', 'about/index.html', 'notes/index.html', 'resume/index.html', 'contact/index.html']
for path in expected: assert (root / path).exists(), f'Missing page: {path}'
pages = {}
for path in root.rglob('*.html'):
    page = Page(); page.feed(path.read_text()); pages[path.resolve()] = page
    assert page.h1s == 1, f'{path}: expected one h1, got {page.h1s}'
    assert page.mains == 1, f'{path}: expected one main landmark'
    for field in ['description', 'og:title', 'og:description', 'og:url', 'og:type', 'twitter:card']:
        assert page.meta.get(field), f'{path}: missing {field}'
    assert len(page.canonical) == 1, f'{path}: missing or duplicate canonical'
    assert page.canonical[0].startswith('https://jonalejandro.com/'), f'{path}: invalid canonical'

for path, page in pages.items():
    for href in page.links:
        url = urlsplit(href)
        if url.scheme or url.netloc:
            if url.netloc != 'jonalejandro.com': continue
        relative = unquote(url.path)
        target = root / relative.lstrip('/') if relative.startswith('/') else path.parent / relative
        if not relative: target = path
        if target.is_dir(): target = target / 'index.html'
        target = target.resolve()
        assert target.is_relative_to(root), f'{path}: link escapes build directory'
        assert target.exists(), f'{path.relative_to(root)}: broken internal link {href}'
        if url.fragment and target in pages:
            assert unquote(url.fragment) in pages[target].ids, f'{path}: broken anchor {href}'

feed = ET.parse(root / 'feed.xml')
entries = feed.findall('{http://www.w3.org/2005/Atom}entry')
assert len(entries) >= 4, 'RSS is missing published essays'
sitemap = ET.parse(root / 'sitemap.xml')
assert len(sitemap.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')) >= 9, 'Sitemap is missing pages'
home = (root / 'index.html').read_text()
assert 'rf-vs-analog-vs-power' in home, 'Homepage is missing the latest essay'
assert 'profile.png' not in home, 'Homepage still loads the original large portrait'
for path in pages:
    assert '{%' not in path.read_text(), f'{path}: unrendered Liquid tag'
print(f'Checked {len(pages)} HTML pages, internal links, image sources, article metadata, RSS, and sitemap.')
