# attebury.dev

Personal blog built with [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog), published to [attebury.dev](https://attebury.dev).

## Branches

- **main** — source code; pushes trigger a build
- **site** — built output, published by GitHub Pages (do not edit directly)

## Adding a post

Create a markdown file in `content/blog/`:

```markdown
---
title: "Your title"
description: "Short summary for feeds and SEO."
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
