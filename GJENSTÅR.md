# MOVE Sogn — Gjenstår

_Sist oppdatert: 2026-05-03_

---

## 1. Avventer frå klient

| # | Kva | Merknad |
|---|-----|---------|
| 1 | **Toyota bil-bilete** | Klient sender — erstattar dagens bilde på Toyota-kortet |
| 2 | **Hertz bil-bilete** | MC_bZ-bilete nemnt av klient |
| 3 | **Hero-bilete** | Kinoformat fjord/veg, ≥1920px, WebP, ≤1.5 MB |
| 4 | **Logo PNG — blå** | Nav (lys bakgrunn) |
| 5 | **Logo PNG — kvit** | Footer (mørk bakgrunn) |
| 6 | **Favicon** | `/public/favicon.ico` + `/public/apple-touch-icon.png` |
| 7 | **OG-bilete** | `/public/og-default.jpg`, 1200×630 px, sosiale medium |
| 8 | **Summerfun-bilete** | 3–5 bilete per modell |
| 9 | **Silver Boats-bilete** | Per modell |
| 10 | **El-sykkel/-moped-bilete** | Per modell (Merida + NIU) |
| 11 | **Næringseigendom-bilete** | PV5, Køff, ANI Anlegg m.fl. |
| 12 | **Org.nr** | Stadfest korrekt nummer til footer |
| 13 | **Google Maps-lenke** | Riktig Kaupanger-koordinatar til footer-kart |
| 14 | **Sosiale medium** | Facebook + Instagram URL stadfesta |

---

## 2. Bil-korta på framsida

| # | Kva |
|---|-----|
| 1 | Byt ut **Bilhuset Førde**-kort med **Lexus bruktbil**-kort (klient-ønske) |
| 2 | Oppdater Toyota-kortbilde når klient sender bilete |
| 3 | Oppdater Hertz-kortbilde (MC_bZ) |

---

## 3. Eigedom-seksjon (deaktivert)

| # | Kva |
|---|-----|
| 1 | Aktiver `/eigedom`-ruta på nytt |
| 2 | Bygg **Næringseigendom**-side (PV5, Køff, ANI Anlegg…) |
| 3 | Casa Banderas ligg på `/casa-banderas` — stadfest at landing page er komplett |

---

## 4. Sanity-innhald (Studio)

| # | Kva | Type |
|---|-----|------|
| 1 | **Redeploy Studio** — ny auth krevst (`npx sanity@latest mcp configure`) | Dev |
| 2 | Legg inn båtmodellar — Summerfun, Silver Beaver BR, Silver Hawk BR | `marineBoat` |
| 3 | Legg inn Suzuki-motorar | `suzukiEngine` |
| 4 | Legg inn sykkelprodukt — Merida + NIU-modellar | `sykkelProduct` |
| 5 | Slå på **"Vis på framside"** for ønskte produkt (ny felt, klar) | `featuredOnHomepage` |
| 6 | Fyll inn `siteSettings` — telefon, epost, adresse, opningstider | `siteSettings` |
| 7 | Tidslinje-innhald for Om oss | `timelineEntry` |

---

## 5. Teknisk / SEO

| # | Kva |
|---|-----|
| 1 | Legg til e-postpåmelding for nyheitsbrev/tilbod |
| 2 | Stadfest Google Analytics 4 Measurement ID er satt i produksjon |
| 3 | Sjekk `next-sitemap` genererer korrekt `sitemap.xml` etter neste bygg |
| 4 | Vurder SEO-innhald per side — antall ord viktig for Google-rangering |
