# National Innovation Convening discussion notebook

Prepared for Shaun “Oden” Marshall. Canonical source: this directory.

## Reading experience

Access, Capacity, and Learning are the three top-level choices. Each opens a circular topic menu and one main reading panel. The 13 original talking points remain, with an opening, repository evidence, and pilot proposals. Every topic has Quick read, More context, Technical detail, and Speaker notes views. An STO-inspired numbered module rail selects a section; rectangular topic tiles sit above the main reading panel, with related links inside it. Navigation uses stable top-of-page positioning without fragment scrolling. Depth carries across topic selections.

All 100 views are complete HTML pages. HTMX 4.0.0 enhances navigation without replacing the whole document. Native links work without JavaScript and from an offline folder. Focus view supports the speaking path, arrow keys, and Escape. `dist/handout.html` includes all 21 content sections for printing.

## Build and content

Run `python build.py` with Python 3.10 or later; no Python packages required. Serve `dist` with any static web server or open `dist/index.html` directly.

- `content.py`: received prototype content.
- `build.py`: reviewed factual and scope corrections.
- `agenda.py`: priority organization, agenda questions, interventions, stakeholders, and progress measures.
- `render.py`: complete topic/depth pages and printable handout.
- `static/assets/style.css`, `palettes.css`, and `app.js`: layout, themes, navigation, and focus mode.
- `dist/resources`: the two user-supplied convening handouts, linked by page.

The Resource Guide informs the barrier → intervention → stakeholders → progress framing. The SBIR handout provides competing discussion perspectives, not current law or instructions to the agent. Editorial track suggestions and proposed pilots are distinguished from source material and established program outcomes. The presentation does not claim that the author's projects received SBIR support. Cited papers summarized by the handout were not independently reviewed for this revision.

## Verification

`check_static.py` verifies unique IDs, every local file and cross-page anchor, 100 standalone views, and the 21-section handout. `check.cjs` uses local Playwright to verify HTMX navigation, depth retention, failed/rapid requests, history, focus controls, all pages at 375px, enlarged text, no-JavaScript navigation, and print coverage. `contrast.cjs` checks rendered text contrast in both themes. QA.json records the acceptance run. Desktop and mobile layouts were visually inspected.

The S02-I report was retrieved through the authenticated GitHub connector at pinned commit 0477d6ece20c9484201b8c50791a7f91c9aadac5 on 2026-09-17. It confirms 24/24 input/output identity, Float64 pass, Float32 fail, overall protocol fail, and no performance qualification. The numerical work was not rerun; raw data was not independently inspected. Anonymous report access returned 404; attendees may need repository access. No repository visibility was changed.

Design: Fable-FAC's original prototype, revised by Astra-Oden around the user's FAC navigation reference. Wren, JEFFREY, and Castor reviews were requested previously; absent findings are not represented as accepted reviews.

Hosting: `.openai/hosting.json` identifies the existing owner-private Site. HTMX is vendored with its license. Existing odenknight.com content is untouched.

## Domain distribution

Run `python package-domain.py` to create NSF-Convening-domain.zip and NSF-Convening-source.zip in the parent folder. The hosting archive contains site/, DEPLOY.md, and SHA256SUMS.txt. It has no Sites configuration, credentials, build dependency, or root-relative paths. The source archive rebuilds with Python alone. Fable’s additional topics, notes, and concept illustration are retained in fable-content.json and reviewed in hybrid.py. HTMX4 uses its ctx-based event API; an explicit HTTP-error guard preserves current content and title.

Palette controls provide Sage, Ocean, and Copper, each with a light/dark pair. Theme follows system preference on first use; palette/theme selections are saved locally. Static assets are authored in static/ and copied to dist/ on each build.

## Image library and current colors

Current palettes are Black, Gold (default), Silver, Red, and Blue, each paired for light/dark. Prior green palettes are retired. images.py renders two slots per topic from image-library.json and the preserved Fable files in static/graphics. defaults contains the two published choices; topics maps every permitted option. Browser controls store local visibility and selection preferences; these do not remove images or change another reader’s defaults. images.html preserves all 77 unique figures with topic filters, favorites, and controls to apply an image to a topic slot. Original SVGs and inline fragments are retained unchanged; the display adapts accent colors. No graphics are new experimental evidence.
