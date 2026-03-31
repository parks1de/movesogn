# CONTENT POPULATION REPORT — MOVE Sogn
> Generated: 2026-03-31  
> Source: Wix site audit (movesogn.no) + existing Next.js codebase  
> Note: Wix uses client-side rendering (Thunderbolt). Automated scraping returned no text content. This report is based on manual domain knowledge, the existing Next.js pages, and business context.  
> **ACTION REQUIRED**: Visit each Wix URL in a browser and copy text into the STATIC column below before populating Sanity.

---

## Legend
| Symbol | Meaning |
|--------|---------|
| **STATIC** | Hardcode in Next.js — rarely or never changes |
| **SANITY** | Managed via Sanity Studio — client updates independently |

---

## / — Heimside (Homepage)
**Wix URL**: https://www.movesogn.no

| STATIC (hardcode in Next.js) | SANITY (Studio) |
|------------------------------|-----------------|
| Nav structure, footer links | Hero headline + subtext |
| Brand section headings ("Marine", "Sykkel", "Eigedom") | Hero image (hero-kaupanger.jpg) |
| Company tagline: "Me flyttar deg — gjennom livet." | Toyota block: headline, body, CTA |
| Section layout & background rhythm | Marine teaser: headline, body copy |
| Page metadata / OG tags | Sykkel teaser: headline, body copy |
| StatCounter values (40, 60, 4) if never changing | StatCounter values if they change |
| "Sidan 1984" label | Eigedom card: images, titles, descriptions |
| Ghost watermarks ("MOVE", "40") | |

---

## /bat — Båtar
**Wix URL**: https://www.movesogn.no/bat

| STATIC | SANITY |
|--------|--------|
| Page hero layout | Hero image + headline |
| Section headings ("Våre modellar", "Galleri") | Boat listings (model name, length, persons, motor, price, image) |
| Brand story intro label | Brand story body copy |
| Philosophy icons (anchor, shield, compass) | Philosophy titles & descriptions |
| Contact form label/heading | Gallery images |
| CTA strip layout | CTA strip headline + body |

---

## /batmotor — Båtmotor (Suzuki)
**Wix URL**: https://www.movesogn.no/batmotor

| STATIC | SANITY |
|--------|--------|
| Page structure, Suzuki branding context | Motor models (name, power, price) |
| "Autorisert Suzuki-forhandlar" label | Hero image + headline |
| Contact form | Motor specs / feature descriptions |
| | Service info |

---

## /service-batmotor — Service Båtmotor
**Wix URL**: https://www.movesogn.no/service-batmotor

| STATIC | SANITY |
|--------|--------|
| Page layout | Service offerings list |
| "Autorisert Suzuki-service" label | Pricing or contact info |
| Contact form | Hero image |
| | Opening hours override (if different from main) |

---

## /summer-fun — Hasle Summerfun
**Wix URL**: https://www.movesogn.no/summer-fun

| STATIC | SANITY |
|--------|--------|
| Page layout | Product specs (length, persons, motor, price) |
| "Summerfun" brand label | Body copy / product description |
| Hero layout | Hero image |
| Contact form | Gallery images |
| | Features / what's included |

---

## /elsykkel — El-sykkel
**Wix URL**: https://www.movesogn.no/elsykkel

| STATIC | SANITY |
|--------|--------|
| Page layout, section headings | Sykkel product listings (name, range, motor, weight, price) |
| Philosophy icons (leaf, clock, trending-up, zap) | Product images |
| Contact form | Hero headline + image |
| Brand labels (Merida, NIU) | Value prop titles + descriptions |
| | Product detail body text |

---

## /bilutleige — Hertz Bilutleige
**Wix URL**: https://www.movesogn.no/bilutleige (404 on Wix)

| STATIC | SANITY |
|--------|--------|
| Page layout | Hertz location details |
| "Hertz" branding | Fleet / car categories |
| Contact information | Hero image |
| Link to hertz.no | Pricing info (if shown) |

---

## /service-bil — Service Bil
**Wix URL**: https://www.movesogn.no/service-bil

| STATIC | SANITY |
|--------|--------|
| Page layout | Service offerings list |
| "Skadesenteret Sogn" label | Pricing / estimate info |
| Contact form | Hero image |
| Phone / address | Opening hours override |

---

## /casabanderas — Casa Banderas
**Wix URL**: https://www.movesogn.no/casabanderas

| STATIC | SANITY |
|--------|--------|
| Page layout, gold/warm colour treatment | Property headline + body copy |
| Location label "Spania" | Property images (gallery) |
| Contact form | Floor plan / specs |
| Legal disclaimer | Price / availability status |
| | "TILBOD" / status badge |

---

## /eigedom — Eigedom
**Wix URL**: https://www.movesogn.no/eigedom

| STATIC | SANITY |
|--------|--------|
| Page layout | Property listings (name, type, size, status) |
| Section headings | Property images |
| Contact form | "LEDIG" / availability badges |
| | Næringslokale descriptions |
| | Casa Banderas teaser copy |

---

## /om — Om oss
**Wix URL**: https://www.movesogn.no/om

| STATIC | SANITY |
|--------|--------|
| Page layout | Timeline entries (year, headline, description) |
| Values section (icons) | Value card titles + descriptions |
| StatCounter (40+, 60+, 4) | Team members (if shown) |
| Vision quote attribution | Vision pullquote text |
| | Hero image |

---

## /visjon — Visjon
**Wix URL**: https://www.movesogn.no/visjon

| STATIC | SANITY |
|--------|--------|
| Page layout | Vision statement body copy |
| Section headings | Any philosophy/value text |
| | Images |

---

## Summary — What to Populate in Sanity First

Priority order for Studio content entry:

1. **siteSettings** — phone, email, address, openingHours (already in schema)
2. **boatModel** — Summerfun, Silver Beaver BR, Silver Hawk BR (specs + images)
3. **sykkelProduct** — Merida + NIU models (specs + images)
4. **eigedom** — Næringslokale + Casa Banderas listings
5. **timelineEntry** — 1984, 2008, 2011, 2021, today (already placeholder data)
6. **brandGateway** — Toyota, Marine, Sykkel, Eigedom hero blocks
7. **motorProduct** — Suzuki outboard motors

## Files Needing Hero Images (upload to /public/images/)

| File | Used On |
|------|---------|
| `hero-kaupanger.jpg` | Homepage hero (currently placeholder Unsplash) |
| `toyota-sogn-hero.jpg` | ✅ Already present |
| `marine-hero.jpg` | Marine page (currently Unsplash) |
| `sykkel-hero.jpg` | Sykkel page (currently Unsplash) |
