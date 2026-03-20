# MOVE Sogn — movesogn.no

Production website for MOVE Sogn AS — a hybrid brand portal and direct sales site for automotive, marine, and e-mobility products in Sogn, Norway.

**Stack:** Next.js 14 · TypeScript · CSS Modules · Google Sheets (Apps Script CMS) · HubSpot Forms · Vercel · Google Analytics 4

---

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/your-org/movesogn.git
cd movesogn
npm install

# 2. Copy env file and fill in values
cp .env.example .env.local

# 3. Run dev server
npm run dev
# → http://localhost:3000
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SHEETS_API_URL` | Google Apps Script Web App URL (see CMS setup below) |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | Your HubSpot portal ID |
| `NEXT_PUBLIC_HUBSPOT_FORM_GUID_CONTACT` | HubSpot form GUID for general contact |
| `NEXT_PUBLIC_HUBSPOT_FORM_GUID_MARINE` | HubSpot form GUID for marine inquiries |
| `NEXT_PUBLIC_HUBSPOT_FORM_GUID_SYKKEL` | HubSpot form GUID for sykkel inquiries |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (G-XXXXXXXXXX) |
| `NEXT_PUBLIC_SITE_URL` | Production URL: `https://www.movesogn.no` |

---

## CMS — Google Sheets Setup

Content is managed via Google Sheets + Apps Script. No login portal needed — editors work directly in Google Sheets.

### Step 1 — Create the Google Sheet

Create a new Google Sheet with these tab names (exact, lowercase):

| Tab name | Purpose |
|---|---|
| `mobilitet` | Brand cards (Toyota Sogn, Bilhuset Førde, MOVE Bilutleige) |
| `marine` | Summerfun / Silver boat listings |
| `sykkel` | El-sykkel, scooter, sparkesykkel listings |
| `eigedom` | Property listings |
| `timeline` | Om oss history timeline |
| `gallery` | Image gallery items |

### Step 2 — Column headers per sheet

**mobilitet:**
`slug | title | descriptor | image | external_url | label | cta_text`

**marine:**
`slug | model_name | length | persons | motor_options | price_from | image | images | body | specs_table`

> `images` = comma-separated URLs for gallery. `specs_table` = JSON string e.g. `{"Lengde":"4.8 m","Motor":"50 hk"}`

**sykkel:**
`slug | name | category | range_km | motor_w | weight | price_from | image | images | body`

> `category` must be one of: `sykkel` | `scooter` | `sparkesykkel`

**timeline:**
`order | year | headline | description`

### Step 3 — Deploy the Apps Script

1. In your Google Sheet: **Extensions → Apps Script**
2. Replace all code with the contents of `google-apps-script/Code.gs`
3. Save (Ctrl+S)
4. Click **Deploy → New deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** and copy the Web App URL
6. Paste URL into `NEXT_PUBLIC_SHEETS_API_URL` in `.env.local`

### Updating content

Edit any row in the Google Sheet. Changes appear on the site within **5 minutes** (ISR revalidation interval). To see changes immediately, trigger a Vercel redeploy.

---

## HubSpot Forms Setup

1. Log into HubSpot → **Marketing → Forms**
2. Create three forms:
   - **MOVE Sogn — Kontakt** (general)
   - **MOVE Sogn — Marine** (boat inquiries)
   - **MOVE Sogn — Sykkel** (bike/scooter inquiries)
3. For each form, add fields: `firstname`, `email`, `phone`, `message`, `model` (optional)
4. Copy your **Portal ID** (Settings → Account Defaults) and each form's **GUID** (from the form URL)
5. Add all four values to `.env.local`

---

## Logo Replacement

Replace the SVG placeholders in `/public/images/` with real PNG files from the brand assets:

| File | Use | Source |
|---|---|---|
| `public/images/logo-blue.png` | Nav (scrolled, light bg) | `BLUE.png` from project assets |
| `public/images/logo-white.png` | Footer (dark bg) | `BLACK_WITH_WHITE_GLOW.png` or white variant |

The `NavBar.tsx` and `Footer.tsx` components reference these paths — just drop in the files.

---

## Site Architecture

```
/ ..................... Heim (full)
/mobilitet ........... Mobilitet gateway (full)
/marine .............. Marine listings (full)
/marine/[slug] ....... Boat detail pages (full)
/sykkel .............. Sykkel listings (template)
/sykkel/[slug] ....... Bike/scooter detail (template)
/eigedom ............. Eigedom (template)
/om-oss .............. Om oss (full)
/personvern .......... Privacy policy (full)
/informasjonskapslar . Cookie policy (full)
/api/hubspot ......... Form submission proxy
```

---

## Deployment — Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Link project
vercel link

# 3. Add environment variables in Vercel dashboard
#    Project → Settings → Environment Variables
#    (copy all vars from .env.example)

# 4. Deploy
vercel --prod
```

### Automatic deploys

Push to `main` → Vercel auto-deploys. No CI/CD configuration needed.

### Post-deploy: generate sitemap

```bash
npm run build
# next-sitemap auto-generates public/sitemap.xml and public/robots.txt at build time
```

---

## Design System

| Token | Value |
|---|---|
| Orange (CTA, labels) | `#FF8421` |
| Blue (links, secondary) | `#045FD0` |
| Background | `#F7F6F3` |
| Surface | `#F0EFEC` |
| Body text | `#1A1A1A` |
| Dark (footer, hero) | `#212121` |
| Fonts | Inter + DM Sans (Google Fonts) |
| Border radius (buttons) | 6px |
| Border radius (cards) | 4px |

---

## Pages Status

| Page | Status | Notes |
|---|---|---|
| Heim `/` | ✅ Pixel-complete | Swap placeholder images |
| Mobilitet `/mobilitet` | ✅ Pixel-complete | Add real brand images |
| Marine `/marine` | ✅ Pixel-complete | Driven by CMS |
| Marine detail `/marine/[slug]` | ✅ Pixel-complete | Driven by CMS |
| Sykkel `/sykkel` | ✅ Template | Driven by CMS |
| Sykkel detail `/sykkel/[slug]` | ✅ Template | Driven by CMS |
| Eigedom `/eigedom` | ✅ Template | Add real images + copy |
| Om oss `/om-oss` | ✅ Pixel-complete | Driven by CMS + hardcoded |
| Personvern | ✅ Full content | From project documents |
| Informasjonskapslar | ✅ Full content | From project documents |
| 404 | ✅ Branded | |

---

## Content Needed From Client

Before going live, replace placeholder content with real assets:

- [ ] **Hero images** — Cinematic fjord/road images (≥1920px wide, WebP preferred, ≤1.5MB)
- [ ] **Logo PNG files** — Blue variant (nav) + white variant (footer) from brand assets
- [ ] **OG image** — `/public/og-default.jpg` (1200×630px) for social sharing
- [ ] **Favicon** — `/public/favicon.ico` + `/public/apple-touch-icon.png`
- [ ] **Toyota Sogn image** — Current showroom or model shot
- [ ] **Bilhuset Førde image** — Current showroom shot
- [ ] **MOVE Bilutleige image** — Fleet or location photo
- [ ] **Summerfun boat images** — 3–5 per model (model name, length, price per model)
- [ ] **Silver Boats images** — Per model (specs already populated from documents)
- [ ] **El-sykkel/scooter images** — Per model (prices already populated)
- [ ] **Eigedom images** — Sogn property + Spain property
- [ ] **Om oss team photos** — Optional: staff grid for Om oss page
- [ ] **Social media handles** — Confirm Facebook + Instagram URLs
- [ ] **Google Maps embed URL** — Correct Kaupanger coordinates for footer map
- [ ] **Org.nr** — Confirm correct org number for footer

---

## Local Development Tips

```bash
# Check all pages render without errors
npm run build && npm run start

# Type checking
npx tsc --noEmit

# Lint
npm run lint
```

---

## Folder Structure

```
movesogn/
├── google-apps-script/
│   └── Code.gs              ← Paste into Google Apps Script
├── public/
│   └── images/              ← Logo + static images
├── src/
│   ├── app/                 ← Next.js App Router pages
│   │   ├── layout.tsx       ← Root layout (nav, footer, GA4)
│   │   ├── page.tsx         ← Heim /
│   │   ├── mobilitet/
│   │   ├── marine/
│   │   │   └── [slug]/      ← Boat detail pages
│   │   ├── sykkel/
│   │   │   └── [slug]/      ← Bike detail pages
│   │   ├── eigedom/
│   │   ├── om-oss/
│   │   ├── personvern/
│   │   ├── informasjonskapslar/
│   │   ├── not-found.tsx    ← Custom 404
│   │   └── api/hubspot/     ← Form submission proxy
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NavBar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── CookieBanner.tsx
│   │       ├── ContactForm.tsx
│   │       └── FadeUp.tsx
│   ├── lib/
│   │   └── sheets.ts        ← Google Sheets data fetcher
│   └── styles/
│       └── globals.css      ← Design tokens + global styles
├── .env.example
├── next.config.js
├── next-sitemap.config.js
├── package.json
└── tsconfig.json
```
