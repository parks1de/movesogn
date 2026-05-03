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
| 8 | **Båt-bilete** | Per modell — Summerfun, Silver Beaver BR, Silver Hawk BR, Silver Shark BRX |
| 9 | **El-sykkel/-moped-bilete** | Per modell (Merida + NIU) |
| 10 | **Næringseigendom-bilete** | PV5, Køff, ANI Anlegg m.fl. |
| 11 | **Org.nr** | Stadfest korrekt nummer til footer |
| 12 | **Google Maps-lenke** | Riktig Kaupanger-koordinatar til footer-kart |
| 13 | **Sosiale medium** | Facebook + Instagram URL stadfesta |

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

| # | Kva | Status | Type |
|---|-----|--------|------|
| 1 | Studio redeployert til `movesogn.sanity.studio` | ✅ Ferdig | Dev |
| 2 | Båtmodellar importert frå CSV — tekst/pris/spesifikasjonar inne | ✅ Ferdig (5 dokument — 2 publisert, 3 kladd) | `marineBoat` |
| 3 | Sykkelprodukt importert frå CSV — tekst/pris/spesifikasjonar inne | ✅ Ferdig (4 dokument — 3 publisert, 1 kladd) | `sykkelProduct` |
| 4 | Last opp bilete for båtar og syklar i Studio | ⏳ Avventer bilete frå klient | `image` |
| 5 | Legg inn **Suzuki-motorar** | ⏳ Gjenstår | `suzukiEngine` |
| 6 | Slå på **"Vis på framside"** for ønskte produkt | ⏳ Gjenstår | `featuredOnHomepage` |
| 7 | Fyll inn `siteSettings` — telefon, epost, adresse, opningstider | ⏳ Gjenstår | `siteSettings` |
| 8 | Tidslinje-innhald for Om oss | ⏳ Gjenstår | `timelineEntry` |

### Båtar i datasettet
| ID | Modell | Status |
|----|--------|--------|
| `marineBoat-hasle-summer-fun` | Hasle Summer Fun | Publisert |
| `marineBoat-linder-440-fishing` | Linder 440 Fishing | Publisert |
| `drafts.marineBoat-silver-beaver-br` | Silver Beaver BR | Kladd |
| `drafts.marineBoat-silver-hawk-br` | Silver Hawk BR | Kladd |
| `drafts.marineBoat-silver-shark-brx` | Silver Shark BRX | Kladd |

---

## 5. Teknisk / SEO

| # | Kva |
|---|-----|
| 1 | Legg til e-postpåmelding for nyheitsbrev/tilbod |
| 2 | Stadfest Google Analytics 4 Measurement ID er satt i produksjon |
| 3 | Sjekk `next-sitemap` genererer korrekt `sitemap.xml` etter neste bygg |
| 4 | Vurder SEO-innhald per side — antall ord viktig for Google-rangering |
