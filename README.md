# attebury.dev

Personal blog built with [Eleventy](https://www.11ty.dev/), published to [attebury.dev](https://attebury.dev).

## Branches

- **main** — source code; pushes trigger a build
- **site** — built output, published by GitHub Pages (do not edit directly)

## Adding a post

Create a markdown file in `src/posts/`:

```markdown
---
title: "Your title"
date: 2026-07-09
---

Your content here.
```

Commit and push to `main`. GitHub Actions builds the site and deploys to `site`.

## Local preview

```bash
npm install
npm start
```

Open [http://localhost:8080](http://localhost:8080).

Build only:

```bash
npm run build
```

Output goes to `_site/`.
