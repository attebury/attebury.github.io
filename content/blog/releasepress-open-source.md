---
title: ReleasePress is open source
description: Announcing ReleasePress, an open source CLI for release and export hygiene.
date: 2026-07-09
tags:
  - open-source
  - agentic-development
  - tools
  - releasepress
---
I'm open-sourcing [ReleasePress](https://github.com/attebury/releasepress). I built it because I was running several CLI tools at once and kept stepping on my own feet.

When you're developing more than one tool in parallel, local promotion stops being a convenience and starts being a coordination problem. Tool B depends on a version of Tool A that's installed on your machine. You promote a half-finished change to A because you're testing B. Now B works, A is broken, and you're not always sure which install is which. I needed a way to control when and how tools were promoted locally, so a change to one wouldn't silently wreck another's use of it.

The same problem showed up at the boundary between private development and public release. I've been working against a local Gitea installation. That's useful, but it also means the repo on my machine is not the repo the world should see. Operator config, lane state, agent skills, scripts I wrote at midnight, all of it lives in the same tree. I wanted to choose what gets deployed publicly, preview it before it goes anywhere, and not treat "git push" as the same thing as "release."

ReleasePress is built for that. It exports a public tree from an allowlist, scans it for secrets and private paths, and publishes to a controlled destination for human review. Staging isn't delivery. Preview isn't publication. Nothing public moves until someone has actually looked.

The workflow is intentionally boring:

1. **Export** a public tree from your allowlist
2. **Scan** for secrets and private paths
3. **Stage** to a local or private review repo
4. **Attest** after a human has actually looked at it
5. **Deliver** to configured providers only when explicitly approved

```bash
releasepress release plan --json --config releasepress.config.json
releasepress release prepare --json --config releasepress.config.json --out /tmp/releasepress/public-tree
releasepress release publish-review --json --config releasepress.config.json --path /tmp/releasepress/public-tree --target public-review
releasepress release attest --json --config releasepress.config.json --path /tmp/releasepress/public-tree --target public-review --approve-public-review
releasepress release deliver --json --config releasepress.config.json --path /tmp/releasepress/public-tree --target npm-beta --approve-public npm-beta
```

Every step writes JSON receipts to `.releasepress-report/`. ReleasePress doesn't replace your build tools, your forge, or your package registry. It sits in front of them and keeps the boundaries explicit: what's local, what's under review, and what's actually public.

It's early. The contracts are strict and the gates fail closed. That's the point.

Source and docs: [github.com/attebury/releasepress](https://github.com/attebury/releasepress)
