# -*- coding: utf-8 -*-
"""Build the NSF NIC presentation site: index.html + fragments/<slug>/<depth>.html.

Run:  python build.py
No dependencies. Content lives in CONTENT below; edit there, rebuild.
Depths: surface (inlined in index.html, works with no JS), mid and deep (HTMX fragments).
Status labels: demonstrated | documented | in development | proposed
"""
import os, html, json

HERE = os.path.dirname(os.path.abspath(__file__))
FRAG = os.path.join(HERE, "fragments")

def lbl(kind):
    return f'<span class="status status-{kind.replace(" ", "-")}">{kind}</span>'

def ask(text):
    return f'<p class="ask"><strong>Roadmap ask.</strong> {text}</p>'

def q(text):
    return f'<p class="question"><strong>Question for the room.</strong> {text}</p>'

def measure(text):
    return f'<p class="measure"><strong>How we would know it worked.</strong> {text}</p>'

def table(head, rows):
    h = "".join(f"<th>{c}</th>" for c in head)
    b = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows)
    return f'<div class="tablewrap"><table><thead><tr>{h}</tr></thead><tbody>{b}</tbody></table></div>'

def ul(items):
    return "<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>"

def src(items):
    return '<p class="sources">Sources: ' + " · ".join(f'<a href="{u}" rel="noopener">{t}</a>' for t, u in items) + "</p>"

GH = "https://github.com/Odenknight/"

# ----------------------------------------------------------------------------
# CONTENT. Each section: slug, title, kicker, track tags, surface/mid/deep HTML.
# ----------------------------------------------------------------------------
CONTENT = [
dict(slug="message", title="The message in one breath", kicker="Start here", tracks=["All tracks"],
surface="""
<p class="lede">America can grow its innovation capacity by making it easier for independent researchers, open-source builders, and community organizations to get support, check their work, and put useful results into practice.</p>
<div class="three">
  <div class="pri"><h3>Access</h3><p>One supported front door that connects independent contributors with funding, infrastructure, expertise, and partners.</p></div>
  <div class="pri"><h3>Capacity</h3><p>Steady support for the engineering, maintenance, and validation that turn discoveries into things people can use.</p></div>
  <div class="pri"><h3>Learning</h3><p>Shared records of what was tried, what happened, why it matters, and what should happen next.</p></div>
</div>
""",
mid="""
<p>Translation is wider than commercial products. It also includes public infrastructure, maintained open-source software, and community benefit. Funding matters, but so do engineering help, infrastructure, partners, validation, and access to the right people.</p>
<p>These talking points come from one person's experience across independent software development, computational research, AI governance, and leading a nonprofit community organization, Florida Armored Combat (FAC). Each claim below is labeled by how well it is backed: demonstrated, documented, in development, or proposed.</p>
""" + table(["Priority", "What it means", "Where it lands in the Roadmap"], [
    ["Access", "A navigation and referral service with a named person responsible for the handoff", "Tracks A and C: barriers, infrastructure for the under-resourced"],
    ["Capacity", "Fund software stewardship, validation, and a technical assistance network", "Tracks B and C: models that work, infrastructure"],
    ["Learning", "Interoperable research records that keep failures, corrections, and next steps", "Tracks B and D: best practices, evaluating repeated support"],
]),
deep="""
<p>The three priorities answer the convening's central question directly: what changes, resources, partnerships, programs, and investments move research from the laboratory to society? The evidence behind them is not a policy paper. It is a set of public repositories with retained experiment records, corrections, and explicitly unfinished work.</p>
""" + table(["Label", "Meaning on this site"], [
    [lbl("demonstrated"), "Implemented and backed by retained evidence you can open (reports, logs, manifests)."],
    [lbl("documented"), "Described in repository records; hardware runs not independently rerun for this site."],
    [lbl("in development"), "Real implementation work with stated, unfinished qualification gaps."],
    [lbl("proposed"), "A recommendation. Nothing built yet."],
]) + """
<p>Evidence boundary: repository documents were inspected in August and September 2026. GPU experiments were not rerun for this presentation. Execution dates and publication dates are kept separate wherever they are shown.</p>
"""),

dict(slug="pathway", title="Independent researchers need a real way in", kicker="Talking point 1", tracks=["Track A", "Track C"],
surface="""
<p>Good work starts in places without a grants office: a home lab, an open-source project, a small nonprofit. Being eligible for a program is not the same as having a usable path into it.</p>
""" + q("Who owns the first handoff when someone has promising work but no institution behind them?"),
mid=ul([
    "Useful work can start outside universities, established companies, and federal laboratories.",
    "Independent contributors usually lack grants staff, technology-transfer offices, institutional infrastructure, and professional introductions.",
    "Evaluate applicants on relevant evidence, capability, and potential contribution, not affiliation alone.",
]) + ask("Establish supported entry pathways for independent researchers, open-source teams, and small nonprofits.") + q("Who owns the first handoff when someone has promising work but no institution behind them?"),
deep="""
<p>Breakout point 2 asks for root causes. Here the root cause is structural, not a lack of talent: the systems that move research forward assume an institution sits behind the applicant. Portals, eligibility rules, indirect-cost models, and introductions all presume that.</p>
""" + table(["Breakout point", "Contribution"], [
    ["1. Challenge", "Capable independent contributors cannot convert eligibility into entry."],
    ["2. Root cause", "Support systems assume institutional affiliation and staff."],
    ["3. Existing models", "SBIR/STTR for small businesses; OSF and Registered Reports for open research practice."],
    ["4. Gap", "No accountable handoff for individuals, informal teams, and small nonprofits."],
    ["5. Recommendation", "Supported entry pathways with a named navigator."],
    ["6. Stakeholders", "NSF TIP, SBIR/STTR, EPSCoR institutions, open-source foundations, community organizations."],
    ["7. Measures", "Completed connections and progress toward validation, not portal visits."],
])),

dict(slug="portal", title="An innovation portal that follows through", kicker="Talking point 2", tracks=["Track C", "Track D"],
surface="""
<p>One front door for funding, compute, storage, technical help, research partners, and commercialization support. The important part is not the website. It is the named person or office responsible for what happens after the match.</p>
""" + lbl("proposed"),
mid=ul([
    "Profiles for individuals, informal open-source teams, nonprofits, and small businesses.",
    "Opportunity records that state eligibility, affiliation rules, resources offered, and when those details were last verified.",
    "Matching by the contributor's actual need: compute, storage, validation, research partner, maintenance funding, or commercialization support.",
    "A named navigator or receiving organization responsible for following through.",
    "Tracking whether a referral produced a useful connection, and why unsuccessful referrals stopped.",
]) + ask("Pilot a navigation and partner-matching service connected to existing programs.") + measure("Useful partnerships, infrastructure access, and progress toward validation. Not website traffic."),
deep="""
<p>Funding search already exists, for example <a href="https://simpler.grants.gov/" rel="noopener">Simpler.Grants.gov</a>. The proposal adds what search cannot do: responsibility for the handoff. AI can help discover and explain matches. Program owners stay responsible for eligibility decisions and ambiguous cases.</p>
""" + table(["Portal function", "Who does it", "Why"], [
    ["Find and explain candidate matches", "AI assistance", "Fast, broad, cheap to repeat"],
    ["Eligibility determination", "Program owner", "Accountable, appealable"],
    ["Ambiguous or consequential cases", "Human navigator", "Judgment and follow-through"],
    ["Referral outcome tracking", "Portal record", "Shows where applicants get stuck"],
]) + """
<p>A concrete use case appears later on this site: a nonprofit with a community and worthwhile questions, but no research partner.</p>
"""),

dict(slug="opensource", title="Open-source software is shared innovation infrastructure", kicker="Talking point 3", tracks=["Track B", "Track C"],
surface="""
<p>Research runs on software that someone has to test, document, secure, maintain, and support. That work is what lets a discovery be used by other researchers, nonprofits, businesses, and public agencies.</p>
""",
mid=ul([
    "Maintenance and adoption work deserve recognition alongside new inventions.",
    "Support should reach the people maintaining critical dependencies, including independent contributors.",
    "Reuse lowers adoption costs for everyone downstream.",
]) + ask("Fund software stewardship and adoption as explicit parts of research translation.") + measure("Sustained reuse, lower adoption costs, reliable operation, and less dependence on unsupported components."),
deep="""
<p>Track B asks for models that already work. The open-source ecosystem is one: it produces shared infrastructure without a central owner. Its weak point is also known. Maintenance is unpaid and invisible until something breaks. Treating stewardship as translation, and funding it that way, is a small change to program language with a large effect on who gets supported.</p>
<p>Evidence from this portfolio: the repositories listed under Evidence on this site were built and maintained by an independent contributor, and each retains its own records of what was tested and what remains open.</p>
"""),

dict(slug="modernization", title="Modernizing scientific software needs evidence, not a new language", kicker="Talking point 4", tracks=["Track B"],
surface="""
<p>We rewrote part of our scientific computing tools in Mojo and checked the new version against the established one. Across 24 test cases the two programs gave exactly the same answers. That was only the first test.</p>
<p>We then compared the answers with independent mathematical references. The higher-precision version passed. The lower-precision version failed.</p>
<p class="key">Two programs can agree perfectly and still miss the target. Agreement and accuracy are different questions.</p>
<figure><img src="assets/agreement-vs-accuracy.svg" alt="HIP and Mojo matched in 24 cases; Float64 passed reference accuracy and Float32 failed." loading="lazy"><figcaption>Reported qualification results from the 20 August 2026 campaign. Not a new experiment. Not a speed comparison.</figcaption></figure>
""" + lbl("demonstrated"),
mid="""
<p>Think of two calculators showing the same answer. That is encouraging: they are consistent. But if both round away a small number that matters, both give the same wrong answer. Agreement is a useful check. Accuracy needs an independent reference.</p>
""" + table(["Check", "Result", "Plain meaning"], [
    ["Same input bytes read by both programs", "Pass, 24 of 24", "Both started from the same data"],
    ["Same output bytes", "Pass, 24 of 24", "No disagreement between HIP and Mojo"],
    ["Float64 against independent reference", "Pass", "Higher precision met the pre-set limits"],
    ["Float32 against independent reference", "Fail", "Lower precision exceeded the limits"],
    ["Overall protocol", "Fail", "The full requirement set was not met"],
    ["Speed", "Not measured", "This campaign says nothing about performance"],
]) + ul([
    "Modernization should fix a shown limitation in correctness, maintainability, portability, security, or performance. Language choice alone proves nothing.",
    "The accuracy limits were set before the run, so the failure could not be explained away afterward.",
    "The failed result is kept and published. It tells us exactly where the tool can be trusted and where it cannot.",
]) + ask("Support validated, incremental modernization and independent replication."),
deep="""
<p>The tested operation is a <em>stencil</em>: it compares a grid point with its neighbors to estimate how a quantity changes across space. Such calculations subtract nearly equal numbers and then magnify what remains, so rounding matters even in a single evaluation. Float32 keeps about seven significant digits; Float64 keeps about 15 to 16.</p>
<p>Campaign S02-I covered two precisions, three grid sizes (64³, 128³, 256³), and four input families (quadratic, normalized cubic, asymmetric, sinusoidal), with analytic and independent CPU references.</p>
""" + table(["Precision", "Max relative L2 error", "Frozen limit", "Max scaled L∞ error", "Frozen limit"], [
    ["Float64", "5.98 × 10⁻¹²", "1 × 10⁻¹¹", "5.83 × 10⁻¹¹", "1 × 10⁻¹⁰"],
    ["Float32", "2.32 × 10⁻³", "1 × 10⁻⁴", "1.56 × 10⁻²", "1 × 10⁻³"],
]) + """
<p>Float32 exceeded its limits by roughly 23 and 16 times. The repository attributes the shared failure to finite-precision conditioning and proposes a dedicated study of cancellation, scaling, and resolution.</p>
<h4>Options on the table</h4>
""" + table(["Option", "Benefit", "Required check"], [
    ["Use Float64 now for the qualified stencil", "Already meets the accuracy gates", "Twice the memory per value; real speed cost depends on hardware"],
    ["Reformulate the calculation", "May preserve small differences without extra precision everywhere", "Algebraically equal expressions can behave differently on a computer"],
    ["Mixed precision", "Could cut memory and compute cost", "Cannot restore detail already lost in Float32 inputs"],
    ["Stronger independent references", "Locates the error source", "The reference itself needs validation"],
    ["Benchmark after accuracy passes", "Evidence-based cost decisions", "Hardware changes do not fix low-precision arithmetic"],
]) + """
<p>Three separate questions stay separate: do HIP and Mojo agree; do their answers meet an independent reference; does the model agree with physical evidence? This campaign answers the first two for one kernel on one system. It says nothing about physical feasibility.</p>
<h4>The wider Rust and Mojo portfolio</h4>
""" + table(["Repository", "What is there", "Honest description"], [
    [f'<a href="{GH}KosMojAMD">KosMojAMD</a>', "Six GPU kernel ports (Laplacian, diffusion, derivative stencil, RK4, atomics, STREAM Triad), AMD gfx1103 evidence, HIP comparisons, the 24-case assessment", lbl("demonstrated") + " kernel modernization with bounded hardware validation"],
    [f'<a href="{GH}Computational-Spacetime-Dynamics-Research">Computational-Spacetime-Dynamics-Research</a>', "Comparison reports, run logs, numerical checks, blocked attempts, corrected findings", lbl("documented") + " research campaign that produced reusable tooling"],
    [f'<a href="{GH}LLM_Engine_Rust-Over-GGML">LLM_Engine_Rust-Over-GGML</a>', "Archived Rust serving layer, GGML and Mojo backends, controlled 16-arm comparison, unfinished wave 2", lbl("documented") + " bounded comparison with retained limitations"],
    [f'<a href="{GH}LLM_Engine_MojoRust">LLM_Engine_MojoRust</a>', "Gated Rust/Mojo engine rebuild; accelerator and serving milestones incomplete", lbl("in development")],
    [f'<a href="{GH}GKOS-Engine-Rust/pull/18">GKOS-Engine-Rust PR 18</a>', "Retained executions, differential cases, open qualification gaps", lbl("in development")],
]) + src([
    ("Assessment 2026-08-20", GH + "KosMojAMD/blob/0477d6ece20c9484201b8c50791a7f91c9aadac5/docs/MOJO_AMD_KNIGHTSAI_PHASE_A_SERIES02_ASSESSMENT_2026-08-20.md"),
    ("S02-I disposition", GH + "KosMojAMD/blob/0477d6ece20c9484201b8c50791a7f91c9aadac5/evidence/KnightsAI-PhaseA-Series02-20260820/reports/S02-I-INPUT-IDENTITY.md"),
    ("Preregistered protocol", GH + "KosMojAMD/blob/0477d6ece20c9484201b8c50791a7f91c9aadac5/evidence/KnightsAI-PhaseA-Series02-20260820/preregistrations/S02-I-INPUT-IDENTITY.yaml"),
    ("Floating point background (NVIDIA)", "https://docs.nvidia.com/cuda/floating-point/index.html"),
]) + '<p class="sources">Evidence boundary: inspected 2026-09-17 at commit 0477d6e. GPU tests not rerun; the externally retained 1.2 GiB raw record was not inspected.</p>'),

dict(slug="gkos", title="GKOS: making evidence and decisions inspectable", kicker="Talking point 5", tracks=["Track B", "AI and innovation"],
surface="""
<p>When AI helps with research, someone later has to ask: what evidence supports this claim, what is still uncertain, and what was this action allowed to do? GKOS is my developing approach to keeping those links.</p>
<p class="key">Provenance lets people inspect a claim. It does not make the claim true.</p>
""" + lbl("in development"),
mid=ul([
    "AI-assisted work needs records of sources, transformations, checks, authorization, and resulting actions.",
    "Reviewers should be able to see what supports a claim, what remains uncertain, and what an action was authorized to do.",
    "Corrections stay visible as new versions instead of silently rewriting history.",
]) + ask("Pilot interoperable evidence records across research, validation, and adoption handoffs.") + measure("Less repeated review effort, better reproducibility, and clearer identification of unsupported claims."),
deep=table(["Repository", "Role", "Status"], [
    [f'<a href="{GH}gkos-standard">gkos-standard</a>', "Pre-standard for evidence lineage, authority, dispositions, governance responsibilities, conformance fixtures", lbl("documented")],
    [f'<a href="{GH}GKOS-Engine">GKOS-Engine</a>', "TypeScript reference engine: parsing, validation, lineage, knowledge graph, retrieval, citations", lbl("demonstrated")],
    [f'<a href="{GH}GKOS-Engine-Rust">GKOS-Engine-Rust</a>', "Ground-up Rust implementation; active evidence in draft PR 18 with stated qualification gaps", lbl("in development")],
    [f'<a href="{GH}GKOS-Engine-Lite">GKOS-Engine-Lite</a>', "Rust retrieval and restricted-profile work; conformance and adversarial cases", lbl("in development")],
    [f'<a href="{GH}model-capability-manifest-standard">model-capability-manifest-standard</a>', "Declare AI capability through structured, testable, versioned evidence rather than model names", lbl("proposed")],
]) + """
<p>Division of labor that has held up in practice: AI extracts metadata and proposes classifications and related records; deterministic checks enforce allowed values, required evidence, and consistency; humans review ambiguity and consequential interpretation. Deterministic rules can enforce record integrity. They cannot make scientific interpretation automatically correct, so conflicting interpretations stay attributable and inspectable.</p>
"""),

dict(slug="verification", title="AI speeds up production. Verification has to keep pace.", kicker="Talking point 6", tracks=["AI and innovation"],
surface="""
<p>AI can write code, run analysis, draft documentation, and propose experiments faster than people can check them. Confidence and a fluent explanation are not acceptance criteria.</p>
""" + q("As producing research artifacts becomes cheaper, how do we keep checking them from becoming the next bottleneck?"),
mid=ul([
    "AI capability varies by task. Test it per task instead of trusting a model name.",
    "Use deterministic checks where requirements are explicit. Use qualified human judgment where interpretation is needed.",
    "Budget verification capacity alongside acceleration. One without the other produces volume, not knowledge.",
]) + q("As producing research artifacts becomes cheaper, how do we keep checking them from becoming the next bottleneck?"),
deep="""
<p>Two working examples from this portfolio show the shape of the answer.</p>
<ol>
<li><strong>Pre-set gates.</strong> The Mojo accuracy limits were frozen before the run. When Float32 failed, the failure stood. No one could argue the limits afterward.</li>
<li><strong>Retained corrections.</strong> An earlier finding of <code>TOOLCHAIN_ABSENT</code> was later corrected: an agent had checked global binaries and missed an existing Pixi environment. The record keeps both the wrong diagnosis and the correction, so the next person does not repeat it.</li>
</ol>
<p>The capability-manifest idea belongs here too: if a model or agent declares what it can do in a structured, testable form, verification can be planned instead of improvised.</p>
""" + src([("Retest report with correction", GH + "Computational-Spacetime-Dynamics-Research/blob/main/reports/2026-07-23_ldd-k8_rocsolver_retest_mojo_expansion_report.md")])),

dict(slug="library", title="A Unified Research Library, and outcomes beyond pass or fail", kicker="Talking points 7 and 8", tracks=["Track B", "Track D"],
surface="""
<p>Connect existing repositories through a shared catalog and common research records. Original owners keep their data, permissions, and expertise. The records keep what was tried, what happened, why, and what came next.</p>
<p class="key">"Failed" hides too much. Blocked, aborted, inconclusive, outside domain, and failed-a-requirement are different things.</p>
""" + lbl("proposed"),
mid=ul([
    "Link protocols, attempts, code, environments, results, reviews, and later decisions.",
    "Preserve custodianship, attribution, licensing, and access restrictions.",
    "Record why an attempt stopped and what would be needed to continue.",
    "Keep negative results that resolve uncertainty, alongside implementation and infrastructure failures.",
    "Do not treat a missing record as proof that an experiment never ran. Use <em>unknown</em>.",
]) + ask("Pilot a federated research-record system with a small, useful common schema.") + measure("Evaluate repeated support by demonstrable progress and resolved uncertainty, alongside mission and adoption outcomes."),
deep="""
<p>Foundations already exist. OSF supports research registration. Registered Reports evaluate research plans before results are known. The distinctive addition here is an interoperable record of execution, outcomes, reasons, and subsequent decisions, kept as separate dimensions rather than one pass/fail flag.</p>
""" + table(["Dimension", "Example values"], [
    ["Execution", "Planned, not started, blocked, running, completed, aborted"],
    ["Validity", "Valid, invalid, uncertain, outside applicable domain"],
    ["Finding", "Supports claim, contradicts claim, mixed, inconclusive, not evaluated"],
    ["Criterion results", "Backend parity passed; accuracy failed; timing unevaluated"],
    ["Reason", "Resource unavailable, toolchain problem, implementation defect, precision limit, insufficient data"],
    ["Review", "Unreviewed, machine-checked, human-reviewed, disputed"],
    ["Subsequent decision", "Continue, revise protocol, replicate, pause, retire"],
    ["Record history", "Current, corrected, superseded, withdrawn"],
]) + """
<p>Each classification keeps its source passage or artifact, applicable rule version, reviewer, and date. Distinguish when the experiment happened from when its record was reconstructed or published. Retrospective reconstruction is never labeled preregistration.</p>
<p>The Mojo campaign is the worked example: backend parity passed, Float64 accuracy passed, Float32 accuracy failed, timing unevaluated, overall protocol failed, decision: continue with Float64 and study Float32 separately. One label would have lost all of that.</p>
""" + src([("Center for Open Science, Registered Reports", "https://www.cos.io/initiatives/registered-reports")])),

dict(slug="storage", title="Storage access must come with stewardship", kicker="Talking point 9", tracks=["Track C"],
surface="""
<p>Large research artifacts need affordable storage, findable metadata, integrity checks, and links that last. Capacity alone does not make evidence understandable or reproducible.</p>
""",
mid=ul([
    "Independent researchers need clear guidance on eligibility, costs, retention, and preservation responsibilities.",
    "Pair storage allocations with curation and preservation help.",
]) + ask("Connect storage allocations with curation and preservation assistance.") + measure("Another researcher can locate, understand, and appropriately reuse the evidence."),
deep="""
<p>Concrete case: the Mojo qualification campaign retains a 1.2 GiB raw record outside the repository. The summary on GitHub links to it, but the raw record's durability, integrity checking, and access path are the researcher's own problem to solve and fund. A storage program that included metadata review, checksums, and durable identifiers would make that record citable by others.</p>
"""),

dict(slug="notebook", title="The Warp Field Notebook: a case study in research practice", kicker="Talking point 10", tracks=["Track B"],
surface="""
<p>This is exploratory computational research with explicit limits. Its value for the Roadmap is the practice, not the hypothesis: numerical checks, failed attempts, corrections, and open questions are all kept and shown.</p>
<p class="key">Exploratory work can produce useful methods and infrastructure even when its motivating hypothesis stays unproven.</p>
""" + lbl("documented"),
mid=ul([
    "Present it as exploratory research with stated limitations.",
    "Show how numerical checks, failed attempts, corrections, and unresolved questions are retained.",
    "Highlight reusable tooling and validation methods produced along the way.",
    "Add an experiment ledger with dates, protocol versions, criterion-level outcomes, reasons, and evidence links.",
    "Distinguish contemporaneous records from later reconstruction.",
]),
deep="""
<p>Three exhibit records the logs already support:</p>
<ol>
<li>An experiment blocked by an incorrect environment diagnosis, later corrected.</li>
<li>A port that matched its reference implementation but failed an independent accuracy requirement.</li>
<li>Correct numerical output with unresolved or insufficient performance evidence.</li>
</ol>
<p>For each ledger row: experiment and attempt IDs, execution date, protocol version, code and environment identifiers, criterion-level outcomes, reason codes, evidence links, and corrections. Where the logs do not establish whether something ran, the ledger says <em>unknown</em>.</p>
<p>Neither backend agreement nor the stencil qualification demonstrates a realizable propulsion system. That sentence stays attached to the notebook wherever it is presented.</p>
""" + src([("Computational-Spacetime-Dynamics-Research", GH + "Computational-Spacetime-Dynamics-Research"), ("temporal-modulation-alcubierre", GH + "temporal-modulation-alcubierre")])),

dict(slug="observatory", title="The Observatory: one concrete demonstration", kicker="Talking point 11", tracks=["Track B", "AI and innovation"],
surface="""
<p>The Observatory lets a visitor find an experiment, see its outcome on each criterion, inspect the evidence behind it, and follow any correction. It shows evidence governance through one real research example.</p>
""" + lbl("in development"),
mid=ul([
    "Find an experiment. See execution status and criterion-level outcomes.",
    "Inspect the evidence behind a disposition. Follow a correction or supersession. Find related records.",
    "See clearly whether a displayed event is an authored replay, a live Engine result, or a proposed capability.",
    "Uses a reviewed, sanitized corpus and bounded participant access.",
]) + '<p><strong>Feedback question.</strong> Could an unfamiliar participant explain what was tested, what happened, and what remains unresolved?</p>',
deep="""
<p>Scope is deliberately bounded. The repository's own governance guidance calls for separate application and Engine processes, a synthetic corpus, HTTPS, and additional isolation and credential controls before public live participation. Participant-session gates (expiry, revocation, an observation period) are not finished. So the convening exhibit is read-only, authenticated, and clearly labeled.</p>
<p>Semantic and graph search are discovery aids. Source records remain the basis for every claim, and search respects access permissions before exposing snippets, relationships, or summaries. A new graph integration is not a prerequisite for a useful demo.</p>
""" + table(["Repository", "Role", "Status"], [
    [f'<a href="{GH}GKOS-Observatory">GKOS-Observatory</a>', "Canonical replays, evidence inspection, receipt verification, governed search and read, deployment records", lbl("in development")],
    [f'<a href="{GH}Kosmos-Oden">Kosmos-Oden</a>', "Visual renderer and agent-facing components", lbl("documented")],
]) + src([("Governance lab guidance", GH + "GKOS-Observatory/blob/main/docs/GOVERNANCE-LAB.md"), ("Current release record", GH + "GKOS-Observatory/blob/main/docs/CURRENT-RELEASE.md")])),

dict(slug="fac", title="FAC: the community-to-research gap, seen from the community side", kicker="Talking point 12", tracks=["Track A", "Track C"],
surface="""
<p>Florida Armored Combat is a nonprofit whose members include veterans, parents, blue-collar and white-collar workers, and people from many backgrounds. We have a community and worthwhile questions about belonging, recreation, participation barriers, and retention. We do not have a research partner.</p>
""" + q("Where does a nonprofit go when it has a community and good questions, but no research partner?"),
mid=ul([
    "Community observations can generate research questions. They do not by themselves establish effectiveness or causation.",
    "Researchers and community members should develop the questions together.",
    "Initial support should help establish partnerships, design studies, and arrange appropriate oversight.",
]) + ask("Create an accessible matching pathway between community organizations and research teams.") + q("Where does a nonprofit go when it has a community and good questions, but no research partner?"),
deep="""
<p>Next step already identified: ask a research institution for a community-engagement consultation. The University of Florida Clinical and Translational Science Institute publicly invites people with ideas to contact it. A sensible first project would ask why adults join, remain, or leave, and what benefits or barriers they perceive, including former participants so current members alone do not distort the picture. The institution determines review and consent requirements before any recruitment.</p>
<p>A short partnership brief would cover FAC's activities and locations, the membership diversity, questions members want answered, what FAC can contribute (relationships, facilities, organizational knowledge), and what it needs (study design, independent analysis, research oversight).</p>
<p>This is the portal use case in miniature. The request is not money first. It is a named person who can make the introduction and stay responsible for it.</p>
""" + src([("UF CTSI community entry point", "https://www.ctsi.ufl.edu/community/"), ("Florida Armored Combat", "https://flarmored.org/")])),

dict(slug="assistance", title="A technical assistance network to close the implementation gap", kicker="Talking point 13", tracks=["Track B", "Track C"],
surface="""
<p>Some projects need hands-on engineering help to become usable and maintainable: research software engineering, validation, deployment, security, data stewardship, documentation. Define that service and its users before deciding whether it needs a new institution.</p>
""" + q("Who helps promising work cross the distance between a working prototype and something others can rely on?"),
mid=ul([
    "NSF already has a technology-and-translation directorate, TIP, whose role includes partnerships with industry, nonprofits, civil society, and communities of practice.",
    "The missing piece is an accessible engineering service: RSE and maintenance, reproducibility and independent validation, secure deployment, data stewardship, help moving prototypes into sustained use.",
    "Test it as a funded network of technical assistance centers coordinated through existing structures. A new federal institution is a much larger claim that has not been shown necessary.",
]) + ask("Pilot shared technical assistance for independent researchers, open-source maintainers, and community organizations.") + q("Which existing institution should own accessible engineering and translation support for independent researchers, open-source maintainers, and community organizations, and what resources would let it do that reliably?"),
deep="""
<p>How the three proposals fit together: the portal is the entry point, the technical network provides the assistance, and the research library preserves the evidence and learning. The Observatory demonstrates a small, concrete part of that now.</p>
""" + table(["Service", "Who needs it", "Existing analogue"], [
    ["Research software engineering and maintenance", "Independent maintainers, small labs", "University RSE groups (institution-only today)"],
    ["Reproducibility and independent validation", "Anyone making a technical claim", "Registered Reports, replication grants"],
    ["Secure deployment and infrastructure", "Nonprofits, community projects", "Cloud credits (capacity without stewardship)"],
    ["Data stewardship and record interoperability", "All of the above", "Domain repositories, OSF"],
]) + src([("NSF TIP", "https://www.nsf.gov/tip/latest")])),

dict(slug="evidence", title="Evidence you can open", kicker="Repositories", tracks=["All tracks"],
surface="""
<p>Six public repositories carry the strongest evidence behind these talking points. Each keeps its failures, blocked attempts, and corrections next to its successes.</p>
""" + ul([
    f'<a href="{GH}Computational-Spacetime-Dynamics-Research">Computational-Spacetime-Dynamics-Research</a>: the research campaign records',
    f'<a href="{GH}KosMojAMD">KosMojAMD</a>: the Mojo on AMD modernization case study',
    f'<a href="{GH}gkos-standard">gkos-standard</a>: the evidence-governance pre-standard',
    f'<a href="{GH}GKOS-Engine">GKOS-Engine</a>: the TypeScript reference engine',
    f'<a href="{GH}GKOS-Engine-Rust">GKOS-Engine-Rust</a>: the Rust implementation effort',
    f'<a href="{GH}GKOS-Observatory">GKOS-Observatory</a>: the demonstration',
]),
mid="""
<p>What every repository preserves on purpose:</p>
""" + ul([
    "Exact experiment and source identifiers.",
    "Failed, blocked, superseded, and inconclusive outcomes.",
    "Original timestamps, with execution date kept separate from publication date.",
    "Hardware, software, and environment boundaries.",
    "Links from summaries to the underlying reports, manifests, logs, and artifacts.",
    "Corrections as visible successor records, never silent rewrites.",
    "Explicit separation of backend agreement, scientific accuracy, performance, and production readiness.",
]),
deep="""
<p>Related work, listed after status and evidence boundaries are reconciled: LLM_Engine_Rust-Over-GGML (archived comparison), LLM_Engine_Mojo, LLM_Engine_MojoRust (gated rebuild), GKOS-Engine-Lite, gkos-hindsight-governance, model-capability-manifest-standard, Kosmos-Oden, Kosmos-Oden-Lite, Kosmos_Research_Studio_Lite, Marshal-008-OS, theMarshal-Core-Rust, Hypatia, temporal-modulation-alcubierre, Paper01.</p>
<p>The three Rust/Mojo engine repositories overlap historically. Their READMEs are being reconciled so a visitor can tell immediately what was attempted, what was measured, what was learned, and which repository now carries the authoritative evidence.</p>
<p>Before any private repository goes public it gets a disclosure review: credentials, personal data, internal network details, large artifacts, licensing, and any claim that exceeds the retained evidence.</p>
"""),

dict(slug="engage", title="Ways to engage", kicker="Next steps", tracks=["All tracks"],
surface=ul([
    "<strong>Point to an existing pathway.</strong> If a program already serves independent contributors well, say which one and how someone gets in.",
    "<strong>Offer technical review.</strong> Pick one repository and check whether its claims match its evidence.",
    "<strong>Connect a research partner.</strong> FAC has a community and questions. It needs a study-design collaborator.",
    "<strong>Help shape a pilot.</strong> Portal, technical assistance network, or federated research records.",
]),
mid="""
<p>For the Roadmap facilitators, the asks map onto the seven breakout points and Tracks A through D. See the mid-level and deep views of each talking point for the track tags.</p>
<p>Contact: Shaun "Oden" Marshall, <a href="https://shaunmarshall.com/cv/">shaunmarshall.com/cv</a>. Florida Armored Combat: <a href="https://flarmored.org/">flarmored.org</a>.</p>
""",
deep="""
<p>Site status: this presentation labels every project claim as demonstrated, documented, in development, or proposed. Evidence links go to pinned commits where a specific result is cited. Nothing here was rerun for the convening; the dates on each record are the dates that matter.</p>
<p>Built with HTML, CSS, and HTMX 4.0.0 (vendored, no build step, no tracking). The surface level works with JavaScript disabled. The mid-level and deep-dive views load as HTML fragments.</p>
"""),
]

# Guided speaking path (8 steps) -> section slugs. The topic index covers all sections.
PATH = [("1","Three practical changes","message"),("2","Access: an accountable first handoff","pathway"),
        ("3","Capacity: engineering and validation","assistance"),("4","Evidence exhibit: agreement vs accuracy","modernization"),
        ("5","Learning: records beyond pass/fail","library"),("6","GKOS and the Observatory","gkos"),
        ("7","FAC: community questions need partners","fac"),("8","Roadmap: three bounded pilots","engage")]

