# Thoughts, in Passing

**Thoughts, in Passing** is a lightweight digital garden and idea stream for Kaijing Ma. It is deliberately not a traditional blog: entries can begin as a question, grow in public, connect to older notes, and remain unfinished without looking broken.

The name keeps a family resemblance with [Flow of Thoughts](https://github.com/mkj69/flow_of_thoughs), while signaling a looser and more personal space. “In passing” gives fragments permission to be provisional; the comma adds a brief visual pause.

Live site: <https://mkj69.github.io/thoughts-in-passing/>

> Preview status: the initial entries are explicitly labeled `placeholder`. Replace or remove them before presenting the writing as personal work.

## What the site supports

- a reverse-chronological thought stream;
- topic and tag filtering plus lightweight text search;
- four visible maturity states: `seed`, `sketch`, `evolving`, and `essay`;
- related thoughts and automatically computed backlinks;
- permalink-like hash routes for individual notes;
- responsive, accessible static pages with no framework or third-party runtime;
- automatic validation and GitHub Pages deployment.

## Add a thought

1. Copy [`content/template.md`](content/template.md) into `content/thoughts/`.
2. Rename it with a date and slug, for example `2026-10-03-attention-and-memory.md`.
3. Fill in the front matter and write the note in Markdown.
4. Run the checks:

   ```bash
   node scripts/validate.mjs
   node scripts/build.mjs
   ```

5. Open `docs/index.html` through a local web server; direct `file://` viewing cannot fetch the generated JSON.

The machine-readable contract lives in [`schema/thought.schema.json`](schema/thought.schema.json). `related` contains slugs of outgoing connections. Backlinks are derived at runtime, so they should not be entered manually.

## Maturity guide

| State | Use it for |
| --- | --- |
| `seed` | A question, observation, quotation, or fragment. |
| `sketch` | An idea with an emerging shape but an unfinished argument. |
| `evolving` | A developed note that expects material revision. |
| `essay` | A piece settled enough to stand on its own. |

Maturity is descriptive, not a score. An excellent seed does not need to become an essay.

## Repository map

```text
content/thoughts/   Markdown source notes
content/template.md reusable authoring template
schema/             content contract
scripts/            dependency-free build and validation
docs/               static GitHub Pages site
.github/workflows/  validation and Pages deployment
```

## Design notes

The site borrows the restrained paper palette, serif headlines, and compact navigation of `mkj69.github.io` and `flow_of_thoughs`, then loosens the mood with a visible growth key, a wandering action, a timeline spine, and more editorial whitespace. The interface treats maturity as context rather than hierarchy.

## Deployment

The included workflow validates content, rebuilds `docs/data/thoughts.json`, and deploys `docs/` through GitHub Pages on every push to `main`. In the repository settings, Pages must use **GitHub Actions** as its source.
