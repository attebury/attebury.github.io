---
title: ReleasePress is open source
description: Announcing ReleasePress, an open source CLI for release and export hygiene.
date: 2026-07-09
---
I'm open-sourcing [ReleasePress](https://github.com/attebury/releasepress), a CLI for release and export hygiene.

Most repos accumulate private material — operator configs, lane state, agent skills, local scripts, coverage output — that should never ship in a public tree. ReleasePress builds a reviewable public export from an explicit allowlist, scans it for disallowed surfaces, and gates any public delivery behind human attestation.

The workflow is deliberately boring:

1. **Export** a public tree from your allowlist
2. **Scan** for secrets and private paths
3. **Stage** to a local or private review repo
4. **Attest** after a human has actually looked at it
5. **Deliver** to configured providers (git remotes, npm, etc.) only when explicitly approved

ReleasePress composes with your existing build, forge, and package tools. It does not replace them. It owns the hygiene layer: what goes out, what stays in, and whether the operator has signed off before anything public moves.

```bash
releasepress release plan --json --config releasepress.config.json
releasepress release prepare --json --config releasepress.config.json --out /tmp/releasepress/public-tree
releasepress release publish-review --json --config releasepress.config.json --path /tmp/releasepress/public-tree --target public-review
releasepress release attest --json --config releasepress.config.json --path /tmp/releasepress/public-tree --target public-review --approve-public-review
releasepress release deliver --json --config releasepress.config.json --path /tmp/releasepress/public-tree --target npm-beta --approve-public npm-beta
```

Every step writes JSON receipts to `.releasepress-report/`. Staging is not delivery. Local promote is not a public release. The status command keeps those boundaries explicit so you don't accidentally ship the wrong tree.

If you maintain repos with mixed public and private surfaces — monorepos, agent tooling, anything with operator-only config — this is the tool I wanted and couldn't find. It's early, but the contracts are strict and the gates fail closed.

Source and docs: [github.com/attebury/releasepress](https://github.com/attebury/releasepress)
