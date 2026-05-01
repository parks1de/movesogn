#!/usr/bin/env python3
"""Populate Sanity project o76s1gxs with data from CSV files in assets/."""

import csv, json, re, sys, time
from pathlib import Path
import urllib.request
import urllib.error

PROJECT_ID = 'o76s1gxs'
DATASET    = 'production'
API_VER    = '2026-03-31'
TOKEN      = 'sk97JrOfnLURmrT37JLHVOfTcRDlgpi7R9RcHa2nIuKNFyrXAsbeDlv7RpkWlqc8JiQ9KF06TnzTPGfvq'

ASSETS_DIR = Path(__file__).parent.parent / 'assets'


# ── helpers ──────────────────────────────────────────────────────────────────

def strip_html(s: str) -> str:
    if not s:
        return ''
    s = re.sub(r'<[^>]+>', '', s)
    s = re.sub(r'&nbsp;', ' ', s)
    s = re.sub(r'&#39;', "'", s)
    s = re.sub(r'&amp;', '&', s)
    s = re.sub(r'​', '', s)          # zero-width space from Wix
    s = re.sub(r'\n{3,}', '\n\n', s)      # collapse blank lines
    return s.strip()


def slugify(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r'[åä]', 'a', s)
    s = re.sub(r'[øö]', 'o', s)
    s = re.sub(r'[æ]',  'ae', s)
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')


def wix_to_url(wix: str) -> str:
    """wix:image://v1/HASH~mv2.EXT/... → https://static.wixstatic.com/media/HASH~mv2.EXT"""
    if not wix:
        return ''
    if wix.startswith('http'):
        return wix
    m = re.match(r'wix:image://v1/([^/#]+)', wix)
    if m:
        return f'https://static.wixstatic.com/media/{m.group(1)}'
    return wix


def extract_price(s: str) -> str:
    """Extract numeric price string from messy HTML/text, returns e.g. '46 900'"""
    s = strip_html(s)
    m = re.search(r'kr\s*([\d\s.]+?)[\s,\-\*]', s, re.IGNORECASE)
    if m:
        raw = m.group(1).replace('.', '').replace(',', '').strip()
        # format with spaces: 46900 → "46 900"
        try:
            n = int(raw)
            return f'{n:,}'.replace(',', ' ')
        except ValueError:
            return raw
    return s.strip()


def parse_wix_gallery(gallery_json: str) -> list[str]:
    if not gallery_json:
        return []
    try:
        items = json.loads(gallery_json)
        urls = []
        for item in items:
            src = item.get('src', '')
            url = wix_to_url(src)
            if url:
                urls.append(url)
        # deduplicate preserving order
        seen = set()
        result = []
        for u in urls:
            if u not in seen:
                seen.add(u)
                result.append(u)
        return result
    except (json.JSONDecodeError, TypeError):
        return []


def mutate(mutations: list[dict]) -> dict:
    url = f'https://{PROJECT_ID}.api.sanity.io/v{API_VER}/data/mutate/{DATASET}'
    body = json.dumps({'mutations': mutations}).encode()
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            'Authorization': f'Bearer {TOKEN}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f'  HTTP {e.code}: {e.read().decode()[:300]}')
        return {}


# ── boats ─────────────────────────────────────────────────────────────────────

def parse_boat_specs(teknisk: str, teknisk_info: str) -> dict[str, str]:
    """Parse parallel label/value columns into a dict."""
    labels = [l.strip() for l in re.split(r'\n|<br\s*/?>', strip_html(teknisk)) if l.strip()]
    values = [v.strip() for v in re.split(r'\n|<br\s*/?>', strip_html(teknisk_info)) if v.strip()]
    # first label is usually "Teknisk" header — skip it
    if labels and labels[0].lower() in ('teknisk', 'teknisk\xa0'):
        labels = labels[1:]
    result = {}
    for label, value in zip(labels, values):
        label = label.rstrip(':').strip()
        if label and value:
            result[label] = value
    return result


def load_boats() -> list[dict]:
    docs = []
    with open(ASSETS_DIR / 'BÅTPAKKAR.csv', encoding='utf-8-sig') as f:
        for i, row in enumerate(csv.DictReader(f)):
            title  = row.get('Tittel 1', '').strip()
            if not title:
                continue
            status = row.get('Status', 'DRAFT').upper()
            order  = int(row.get('sortering', 10) or 10)
            slug   = slugify(title)
            doc_id = f'marineBoat-{slug}'
            if status == 'DRAFT':
                doc_id = f'drafts.{doc_id}'

            raw_price    = row.get('Pris', '')
            price_from   = extract_price(raw_price)
            price_note   = strip_html(row.get('Pris tillegstekst', ''))
            short_desc   = strip_html(row.get('Short Description', ''))
            body         = strip_html(row.get('Skildring', ''))
            std_equip    = strip_html(row.get('Standardutstyr', ''))
            motor_title  = row.get('Tittel, motor', '').strip()
            motor_title2 = row.get('Motor, tittel 2', '').strip()
            motor_opts   = ' / '.join(filter(None, [motor_title, motor_title2]))
            motor_desc   = strip_html(row.get('Motor, skildring', ''))

            specs_raw = parse_boat_specs(
                row.get('Teknisk', ''),
                row.get('Teknisk, info', ''),
            )
            # extract common fields
            length  = specs_raw.get('Lengde') or specs_raw.get('Lengde ')
            width   = specs_raw.get('Bredde') or specs_raw.get('Bredde ')
            weight  = specs_raw.get('Vekt')   or specs_raw.get('Vekt ')
            persons = specs_raw.get('Antall passasjerer') or specs_raw.get('Ant. sitteplasser')
            specs_json = json.dumps(specs_raw, ensure_ascii=False)

            image_raw  = row.get('Image', '')
            image_url  = wix_to_url(image_raw)

            gallery_raw = row.get('Galleri', '')
            gallery = []
            if gallery_raw.strip().startswith('['):
                gallery = parse_wix_gallery(gallery_raw)
            else:
                # may be single wix URL
                url = wix_to_url(gallery_raw)
                if url:
                    gallery = [url]

            doc = {
                '_id':   doc_id,
                '_type': 'marineBoat',
                'modelName':          title,
                'slug':               {'_type': 'slug', 'current': slug},
                'order':              order,
                'priceFrom':          price_from,
                'priceNote':          price_note or None,
                'shortDesc':          short_desc or None,
                'body':               body or None,
                'length':             length or None,
                'persons':            persons or None,
                'motorOptions':       motor_opts or None,
                'motorDesc':          motor_desc or None,
                'standardEquipment':  std_equip or None,
                'specsTable':         specs_json,
                'image':              image_url or None,
                'gallery':            gallery or None,
            }
            # strip None values
            doc = {k: v for k, v in doc.items() if v is not None}
            docs.append(doc)
    return docs


# ── bikes ─────────────────────────────────────────────────────────────────────

def load_bikes() -> list[dict]:
    docs = []
    with open(ASSETS_DIR / 'EL-SYKKEL.csv', encoding='utf-8-sig') as f:
        for row in csv.DictReader(f):
            title = row.get('Title', '').strip()
            if not title:
                continue
            status = row.get('Status', 'DRAFT').upper()
            order  = int(row.get('rekkefølge') or row.get('rekkeflg') or 10)

            # slug from "EL-SYKKEL (Title)" col which has the /el-sykkel/slug path
            side = row.get('EL-SYKKEL (Title)', '') or row.get('sidelenke', '')
            slug = side.rstrip('/').split('/')[-1] if side else slugify(title)
            if not slug:
                slug = slugify(title)

            doc_id = f'sykkelProduct-{slug}'
            if status == 'DRAFT':
                doc_id = f'drafts.{doc_id}'

            raw_price  = row.get('PRIS', '')
            price_from = extract_price(raw_price)
            price_note = strip_html(row.get('PRIS TILLEGSTEKST', ''))
            short_desc = strip_html(row.get('Short Description', ''))
            body       = strip_html(row.get('Long Description', ''))
            tech       = strip_html(row.get('Teknisk data', ''))

            image_url  = wix_to_url(row.get('Image', ''))
            gallery    = []  # EL-SYKKEL has no gallery column in this CSV

            doc = {
                '_id':   doc_id,
                '_type': 'sykkelProduct',
                'name':       title,
                'slug':       {'_type': 'slug', 'current': slug},
                'category':   'sykkel',
                'order':      order,
                'priceFrom':  price_from,
                'priceNote':  price_note or None,
                'shortDesc':  short_desc or None,
                'body':       body or None,
                'techSpecs':  tech or None,
                'image':      image_url or None,
            }
            doc = {k: v for k, v in doc.items() if v is not None}
            docs.append(doc)
    return docs


# ── scooters ──────────────────────────────────────────────────────────────────

def load_scooters() -> list[dict]:
    docs = []
    with open(ASSETS_DIR / 'E-SCOOTER.csv', encoding='utf-8-sig') as f:
        for i, row in enumerate(csv.DictReader(f)):
            title = row.get('Title', '').strip()
            if not title:
                continue

            side = row.get('sidelenke', '')
            slug = side.rstrip('/').split('/')[-1] if side else slugify(title)
            if not slug or slug == 'e-sooter':
                slug = slugify(title)

            doc_id = f'sykkelProduct-{slug}'  # scooters always published in source

            raw_price  = row.get('Pris', '')
            price_from = extract_price(raw_price)
            price_note = strip_html(row.get('Pris tillegstekst', ''))
            short_desc = strip_html(row.get('Short Description', ''))
            body       = strip_html(row.get('Skildring', ''))

            # Merge parallel tech columns
            labels = [l.strip() for l in strip_html(row.get('Teknisk info', '')).split('\n') if l.strip()]
            values = [v.strip() for v in strip_html(row.get('Teknisk', '')).split('\n') if v.strip()]
            # values col has the actual data, labels col has the header names
            specs_lines = []
            for label, val in zip(labels, values):
                if label and val:
                    specs_lines.append(f'{label}: {val}')
            tech = '\n'.join(specs_lines) if specs_lines else strip_html(row.get('Teknisk', ''))

            image_url = wix_to_url(row.get('Image', ''))
            gallery   = parse_wix_gallery(row.get('Galleri', ''))

            doc = {
                '_id':   doc_id,
                '_type': 'sykkelProduct',
                'name':       title,
                'slug':       {'_type': 'slug', 'current': slug},
                'category':   'scooter',
                'order':      10 + i,
                'priceFrom':  price_from,
                'priceNote':  price_note or None,
                'shortDesc':  short_desc or None,
                'body':       body or None,
                'techSpecs':  tech or None,
                'image':      image_url or None,
                'gallery':    gallery or None,
            }
            doc = {k: v for k, v in doc.items() if v is not None}
            docs.append(doc)
    return docs


# ── main ──────────────────────────────────────────────────────────────────────

def run():
    boats    = load_boats()
    bikes    = load_bikes()
    scooters = load_scooters()
    all_docs = boats + bikes + scooters

    print(f'Loaded {len(boats)} boats, {len(bikes)} bikes, {len(scooters)} scooters')
    for d in all_docs:
        print(f'  {d["_id"]}')

    print('\nPushing to Sanity …')
    # Send in batches of 10
    BATCH = 10
    for start in range(0, len(all_docs), BATCH):
        batch = all_docs[start:start + BATCH]
        mutations = [{'createOrReplace': doc} for doc in batch]
        result = mutate(mutations)
        txn = result.get('transactionId', '?')
        results = result.get('results', [])
        print(f'  batch {start//BATCH + 1}: txn={txn}, {len(results)} ops')
        time.sleep(0.3)

    print('\nDone.')


if __name__ == '__main__':
    run()
