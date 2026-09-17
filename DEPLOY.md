# Deploy the innovation convening notebook

This is a self-contained static website. It needs no Node server, database, build service, API key, or Sites account. HTMX 4.0.0, styles, scripts, the illustration, and both supplied PDFs are included locally.

## Upload

1. Extract this ZIP.
2. Create an `nsf` folder in your domain's web document root (or choose another folder).
3. Upload **the contents of `site/`** into that folder. `index.html`, `assets/`, and `resources/` must remain beside one another.
4. Open `https://your-domain.example/nsf/`. A subdomain also works: upload the same contents into its document root.

Use ordinary static-file hosting. No single-page-app rewrite rule is needed: each topic and depth has a real `.html` file. Existing domain content does not need to be replaced. Keep the trailing slash when opening the folder URL. Your server should serve HTML as `text/html`, JavaScript as `application/javascript` or `text/javascript`, SVG as `image/svg+xml`, and PDFs as `application/pdf`.

After upload, check Access → Independent researchers → Technical detail, then browser Back. Also open the Resource Guide and the complete handout. Every depth must work when opened directly. If updating a previous copy, upload the whole package together, including `assets/app.js` and `assets/htmx.min.js`; clear that folder's cache in your host/CDN if it retains old files.

## Offline and printing

Open `site/index.html` directly for offline reading. Native page links work without a server; the in-place panel updates use HTTP(S). All four views are complete pages. Select Full handout to print all 21 content sections. Focus view and arrow keys support the speaking path. A numbered sidebar selects a section, topic tiles sit above the reading panel, and related links inside the panel open further topics. Navigation starts at the top without animated anchor jumps.

## Scope

The ZIP contains the authored presentation and the two PDFs supplied for the convening. External repository links still require an internet connection, and some may require repository access. The animated commercial exhibit is a concept illustration, not a live computation or a physical feasibility result. No GPU results were rerun for the website.

Deploying this folder to a public domain makes its contents available under that domain's access rules; the private review site's login is not part of this package.

`SHA256SUMS.txt` records each site's file hash. A separate source ZIP contains the editable Python content/rendering files, assets, and rebuild instructions. Python 3.10+ is sufficient to rebuild; no third-party Python package is required.
