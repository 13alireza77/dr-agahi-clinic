# Dr. Sadaf Agahi — clinic website

Static Astro site. Persian (fa-IR), RTL, no client framework. Output is plain HTML/CSS in `dist/`.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321 — shows dashed "در انتظار" markers for missing info
npm run build     # static site in dist/ (markers are hidden)
npm run preview   # serve dist/ locally
```

## Where to edit

| What | File |
|---|---|
| Phone, address, IRIMC no., booking link, hours, Instagram, landline, logo, domain | `src/data/site.json` |
| Service text, FAQ, steps, SEO title/description | `src/content/services/*.md` (one file per service) |
| "Before your visit" notes | `visitNotes` in `src/data/site.json` |
| Colours, spacing, fonts | top of `src/styles/global.css` |

### Filling the reserved slots (`src/data/site.json`)

- `url` — the real domain once you have it (used for canonical, sitemap, Open Graph, schema).
- `logo` — put the file in `public/` (e.g. `public/logo.svg`) and set `"logo": "/logo.svg"`.
- `landline` — digits only, e.g. `"02122223333"`.
- `instagram` — handle without `@`.
- `hours` — e.g.
  ```json
  "hours": [
    { "days": "شنبه تا چهارشنبه", "time": "16:00–20:00", "schema": "Sa-We 16:00-20:00" }
  ]
  ```
  `schema` feeds Google's opening-hours data.

### Photos

Drop images into `src/assets/photos/` with these names (jpg/png/webp, at least 1600px on the long side). They replace the placeholders automatically and are converted to AVIF/WebP at build time.

| Name | Used for |
|---|---|
| `doctor` | Hero + About portrait (portrait orientation, ~4:5) |
| `clinic` | Clinic interior, home "About" section |
| `hair` | Hair loss (poster photo: hair with serum drop) |
| `eye` | Botox (poster photo: eye) |
| `lips` | Fillers (poster photo: lips) |
| `skin` | Rejuvenation (poster photo: skin with water drops) |

Also needed before launch: `public/og.jpg` (1200×630, shown when the link is shared) and `public/apple-touch-icon.png` (180×180).
