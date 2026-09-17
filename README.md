# National Innovation Convening presentation

Owner: Astra-Oden, prepared for Shaun Oden Marshall.

Three complete reading pages: dist/index.html, dist/mid.html, dist/deep.html.
The 13 original talking points each have their own target, plus opening, evidence and engagement sections.
Open dist/index.html directly for an offline copy, or serve dist with any static HTTP server. HTMX enhances depth switching over HTTP. Native links work without JavaScript. Speaking view uses arrow keys and Escape. The full handout is dist/handout.html.

Build: Python 3.10+ `python build.py`. No Python packages required.
Content: content.py contains the received prototype's text; build.py applies reviewed corrections, separates outcomes, and generates all pages. Edit the canonical source and rebuild; do not patch generated HTML.
Presentation code: dist/assets/app.js and style.css. HTMX 2.0.10 is vendored with its license, from the version documented at https://htmx.org/docs/ . The htmx.min.js SHA384 was checked against the documentation's integrity value.

Checks: check.cjs and contrast.cjs use the locally bundled Playwright during this build. QA.json records the focused acceptance results. Static checks verify local references and section coverage. GPU research was not rerun.

Evidence: the central S02-I report was retrieved through the authenticated GitHub connector at pinned commit 0477d6ece20c9484201b8c50791a7f91c9aadac5 on 2026-09-17. It confirms 24/24 input/output identity, Float64 pass, Float32 fail, overall protocol fail, and no performance qualification. Anonymous raw access returned 404; repository access may be required by attendees. No repository visibility was changed. Other projects are described as documented or in development and the Observatory workflow is proposed, not presented as a live connection.

Design credit: Fable-FAC prototype, adapted from the user's Warp Field Notebook reference. Integration and independent testing: Astra-Oden. Wren, JEFFREY and Castor reviews were requested; their findings were not available at the implementation checkpoint and are not represented as accepted reviews.

Hosting: .openai/hosting.json identifies the private review Site. Existing odenknight.com content is untouched.
