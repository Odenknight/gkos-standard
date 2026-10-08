# Rebuild the notebook

Run `python build.py` using Python 3.10 or later. No packages are needed. The generated website is `dist/`. Upload its contents to the domain folder described in DEPLOY.md.

The imported Fable contributions are in fable-content.json; hybrid.py merges them with the retained factual corrections in build.py and the agenda map in agenda.py. render.py generates full topic/depth pages and the complete handout. Assets and supplied PDFs are included. No credentials, private hosting configuration, or Git history are included.
