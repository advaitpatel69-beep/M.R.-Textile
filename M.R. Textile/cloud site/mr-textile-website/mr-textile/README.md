# M.R. Textile / M.R. Sarees — Marketing Website

A static, framework-free marketing site (HTML5 + CSS3 + vanilla ES6+ JS) for
M.R. Textile, a saree wholesaler in Surat, Gujarat. This is a **branding and
lead-generation site**, not a storefront — there is no cart, checkout, or
pricing anywhere on it, by design.

## Before you publish — please read

The site now uses provided saree photos from `images/sarees/` for the hero,
About section, collection cards, gallery, lightbox, and social preview image.
The older SVG placeholder artwork remains in the repo as fallback/reference
assets, but it is no longer used by `index.html`.

Three other things are placeholder/illustrative and should be reviewed before
launch:

1. **About-section stats** (`index.html`, `#about`): "1000+ Design
   Varieties" and "500+ Wholesale Partners" are illustrative sample figures.
   "10+ Saree Categories" and "6 Days Open Weekly" are accurate, drawn from
   the site's own content and the business hours you provided. Look for the
   `NOTE FOR MAINTAINER` HTML comment just above the stat markup.
2. **Testimonials** (`#testimonials`) are sample/placeholder reviews written
   to be easy to swap for real retailer feedback — they are not quotes from
   real people.
3. **The contact form uses WhatsApp.** It's a static site with no backend, so
   `js/contact-form.js` validates the form and opens a prefilled WhatsApp
   inquiry to the business number. If you later add a backend endpoint or a
   form service, replace that submit handler.

Also update the placeholder domain (`https://www.mrtextile.example/`) used
in the canonical tag, Open Graph tags, Twitter Card tags, `robots.txt` and
`sitemap.xml` once you have a real domain.

## Folder structure

```
mr-textile/
├── index.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── favicon.ico
├── css/
│   ├── main.css          ← production bundle (linked from index.html)
│   └── source/           ← edit these; main.css is generated from them
│       ├── variables.css      (design tokens: color, type, spacing, motion)
│       ├── base.css           (reset, base element styles, a11y)
│       ├── utilities.css      (containers, buttons, eyebrow labels, the
│       │                       zari-divider signature element)
│       ├── layout.css         (preloader, nav, hero, footer)
│       ├── components.css     (about, why-choose-us)
│       ├── collections.css    (collection cards + filters)
│       ├── gallery.css        (masonry grid + shared lightbox)
│       ├── testimonials-faq.css
│       ├── contact.css        (contact cards, form, map)
│       ├── floating-ui.css    (WhatsApp button, back-to-top, toasts)
│       ├── animations.css     (keyframes, scroll-reveal system)
│       └── responsive.css     (mobile/tablet/laptop/desktop breakpoints)
├── js/                   ← ES modules, one feature per file, wired in main.js
│   ├── main.js                (entry point — imports + initializes everything)
│   ├── preloader.js
│   ├── navigation.js
│   ├── hero-slider.js
│   ├── scroll-reveal.js
│   ├── counters.js
│   ├── lightbox.js             (shared by gallery + collections)
│   ├── gallery.js
│   ├── collections.js
│   ├── faq.js
│   ├── testimonials.js
│   ├── contact-form.js
│   ├── scroll-progress.js
│   ├── back-to-top.js
│   ├── lazy-images.js
│   └── toast.js
├── images/
│   ├── hero/              4 landscape background scenes (1920×1080)
│   ├── collections/       10 portrait cards, one per category (900×1200)
│   ├── gallery/           12 mixed-aspect close-ups for the masonry grid
│   └── lifestyle/         3 landscape scenes for About / accent use
└── icons/
    ├── favicon.ico, icon-*.png    (generated app icons)
    └── zari-pattern[-light].svg  (the repeating border-motif tile)
```

## Editing the CSS

Edit files under `css/source/`, **not** `css/main.css` directly — `main.css`
is a generated concatenation of the source files (shipped as one file so the
browser makes a single stylesheet request instead of chaining `@import`s,
which is slower). After editing a source file, regenerate the bundle:

```bash
cd css
{
  for f in variables base utilities layout components collections gallery \
           testimonials-faq contact floating-ui animations responsive; do
    cat "source/${f}.css"; echo
  done
} > main.css
```

## Running locally

The JavaScript uses native ES modules (`<script type="module">`), which
browsers refuse to load over `file://` for security reasons. Serve the
folder with any static file server, for example:

```bash
cd mr-textile
python3 -m http.server 8080
# then open http://localhost:8080
```

## Replacing imagery

Drop in updated photography using the same filenames (or update the `src`
attributes in `index.html` to match new filenames). Similar portrait aspect
ratios work best for the collection cards and gallery:

| Folder                | Used for            | Recommended shape        |
|------------------------|---------------------|---------------------------|
| `images/sarees/degital-sarees/` | Digital/printed hero and gallery photos | Portrait, ~3:4 |
| `images/sarees/designer-sarees/` | Designer and Banarasi-style cards/gallery | Portrait, ~3:4 |
| `images/sarees/fancy-patern-sarees/` | Fancy, wedding and party-wear cards/gallery | Portrait, ~3:4 |
| `images/sarees/printed-sarees/` | Printed and everyday/cotton cards/gallery | Portrait, ~3:4 |
| `images/sarees/silk-sarees/` | Silk, traditional and About-section photos | Portrait, ~3:4 |

Use real JPG/WEBP photography at these sizes (WEBP preferred for file size);
`loading="lazy"` is already set on every non-hero image.

## Content you'll likely want to personalize

- **FAQ answers** (`#faq`) are intentionally general (no invented MOQ figures,
  payment terms, etc.) — update with your actual policies.
- **Collection card "design count" labels** (e.g. "120+ Designs") are
  illustrative — update per real stock levels, or remove the label.
- **Social links** currently include WhatsApp only. Add Instagram/Facebook
  links later if you have real profile URLs.

## Accessibility & performance notes

- Every interactive element is reachable and operable by keyboard; focus
  states are visible throughout (`:focus-visible`).
- All motion respects `prefers-reduced-motion`.
- Images are lazy-loaded (except the 4 hero slides, which are the LCP
  candidate and load eagerly by design).
- The gallery only ships 8 images eagerly; the remaining 4 reveal on
  "Load more" to keep initial payload smaller.
- Structured data (Schema.org `ClothingStore`), Open Graph, and Twitter Card
  metadata are all in `<head>` — update the placeholder domain before going
  live.
