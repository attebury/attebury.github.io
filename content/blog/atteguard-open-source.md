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

I built it after an adversarial security review across the Forest tool stack. The same bug shape kept appearing in different repos. The tool would have a real guard for a trust decision. Then a second path into the same decision would bypass it, or trust caller-supplied data, or use a shortcut that looked safe until you tested symlinks or flag injection.

That is not a team discipline problem. It is duplicated security code. Fix it in one tool. Reinvent it in the next. Break it again in a helper file six months later.

## The pattern

Path containment is a common example. You write a check that keeps output inside a trusted root. A symlink inside the root points outside. A naive check resolves the candidate against itself and passes. The write still escapes.

Command execution is the same story. You allowlist argv in the main command path. A helper builds a shell string. A test fixture passes a ref that starts with `-`. Git treats it as a flag.

Signing is the same story again. You verify a signature packet. The verifier reads the public key from the packet it is trying to verify. An attacker generates a key pair, signs arbitrary data, and embeds their own key. The check passes for the wrong reason.

## What Atteguard is for

Atteguard extracts the recurring fixes into one library. Path containment that survives symlinks. Secret scanning and redaction. Argv template allowlisting. Git ref validation before subprocess calls. Signature verification with a caller-supplied trusted key. An AST checker that compares `authority-claims.json` to actual write call sites in source.

It is a library. It is not a CLI. It does not grant merge authority. It does not run release workflows. You import the module you need and wire it into your tool. Atteguard gives you the guard code. Your tool must still install that guard on every path that needs it.

## Example

A tool exports files from a trusted workspace root. An agent supplies `work/report.json`. The path looks lexically inside the root. The directory is a symlink to `/tmp`.

```js
import { resolveContainedPath, resolveCanonicalRoot } from "atteguard/path-safety";

const root = "/path/to/trusted-workspace";
const canonicalRoot = resolveCanonicalRoot(root);

const { canonical_path } = resolveContainedPath({
  name: "report",
  candidatePath: "work/report.json",
  root,
  canonicalRoot,
});
// use canonical_path for the read or write — not the raw agent string
```

Without the second-phase check against the root's real path, the export looks protected when it is not.

Each module ships adversarial tests named `*.self-issued.test.js`. Those tests encode the exploit the module was written to block. Pin an exact version. These are trust primitives. An old install can look safe when it is not.

Install steps, subpath exports, module examples, release policy, and API detail are in the README.

Start here: [github.com/attebury/atteguard#readme](https://github.com/attebury/atteguard#readme)
