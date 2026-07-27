---
title: "Atteguard: trust-decision primitives for agent tooling"
description: Atteguard is an open source library of shared security code for CLI tools and agent tools.
date: 2026-07-26
tags:
  - open-source
  - agentic-development
  - tools
  - security
  - atteguard
---
[Atteguard](https://github.com/attebury/atteguard) is now open source.

Atteguard is a library for trust decisions in CLI tools and agent tools. It is not a CLI. It has no merge control. It has no release workflow. You import the module you need into your own tool.

The library can do these jobs:

- It can check that a path stays inside a trusted root. The check works when symlinks are present.
- It can scan text for secrets. It can remove secret data from text before you show it.
- It can allow only approved command arguments. It does not accept raw shell strings.
- It can verify a signature. The trusted key must come from your configuration. It must not come from the packet that you verify.
- It can read `authority-claims.json`. It can compare the file to actual write call sites in source code.

```js
import { resolveContainedPath } from "atteguard/path-safety";
import { validateAllowlistedCommand } from "atteguard/command-safety";
import { redactSensitiveText } from "atteguard/text-safety";
```

Other modules give safe git helpers, CLI flag checks, and telemetry event checks. Each module has tests named `*.self-issued.test.js`. These tests show the exploit that the module must block.

You must pin an exact version. An old version can look safe when it is not safe.

Source and docs: [github.com/attebury/atteguard](https://github.com/attebury/atteguard)
