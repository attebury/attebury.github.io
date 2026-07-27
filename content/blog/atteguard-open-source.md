---
title: "Atteguard: trust-decision primitives for agent tooling"
description: Announcing Atteguard, an open source library of shared security primitives for CLI and agent tools.
date: 2026-07-26
tags:
  - open-source
  - agentic-development
  - tools
  - security
  - atteguard
---
I'm open-sourcing [Atteguard](https://github.com/attebury/atteguard).

It's a library of trust-decision code for CLI and agent tools. Path containment that survives symlinks. Secret scanning and redaction. Argv allowlisting instead of shell strings. Signature verification where the trusted key comes from your config, not from the packet you're trying to verify. A checker that reads `authority-claims.json` and compares it against actual write call sites in source, not comments or vibes.

No CLI. No merge button. No release workflow. You import the piece you need and wire it into your own tool.

```js
import { resolveContainedPath } from "atteguard/path-safety";
import { validateAllowlistedCommand } from "atteguard/command-safety";
import { redactSensitiveText } from "atteguard/text-safety";
```

Subpath exports cover git wrappers, CLI flag validation, telemetry event shape checks, and the rest. Each one has adversarial tests named `*.self-issued.test.js` that encode the exploit it was written to block.

Pin exact versions. A stale copy of a trust primitive is worse than no copy, because it looks protected when it isn't.

Source and docs: [github.com/attebury/atteguard](https://github.com/attebury/atteguard)
