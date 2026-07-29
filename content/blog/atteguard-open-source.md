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

I built Atteguard after a security review across [Remogram](https://github.com/attebury/remogram), [SkillPress](https://github.com/attebury/skillpress), [ReleasePress](https://github.com/attebury/releasepress), and related open tooling. The same defect type appeared in many repositories. A tool had a real guard for a trust decision. Then a second path into the same decision did not use the guard. The second path trusted data from the caller. Or the second path used a short check that failed when a symlink or a flag injection was present.

## The pattern

Path containment is one example. You write a check that keeps output inside a trusted root. A symlink inside the root points outside the root. A weak check compares the candidate path to itself and accepts it. The write still leaves the root.

Command execution is a second example. You allow only approved argv in the main command path. A helper builds a shell string. A test fixture sends a ref that starts with `-`. Git reads the ref as a flag.

Signature verification is a third example. You verify a signature packet. The verifier reads the public key from the packet that it verifies. An attacker makes a key pair, signs data, and puts that public key in the packet. The check accepts the signature for the wrong reason.

## What Atteguard is for

Atteguard puts the shared repairs in one library. The library can:

- Keep a path inside a trusted root when symlinks are present.
- Scan text for secrets and remove secret data before you show the text.
- Allow only approved argv templates. It does not accept raw shell strings.
- Validate a git ref before a subprocess starts.
- Verify a signature with a trusted key from your configuration. The trusted key must not come from the packet that you verify.
- Read `authority-claims.json` and compare it to write call sites in source code.

Atteguard is a library. It is not a CLI. You import the module that you need. You connect that module in your tool. Atteguard gives you the guard code. Your tool must still put that guard on every path that needs it.

## Example

A tool exports files from a trusted workspace root. An agent sends `work/report.json`. The path looks as if it stays inside the root. The directory is a symlink to `/tmp`.

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
// use canonical_path for the read or write, not the raw agent string
```

Without the second check against the real path of the root, the export looks protected when it is not protected.

Each module includes adversarial tests named `*.self-issued.test.js`. These tests encode the exploit that the module must block. Pin an exact version. These modules are trust controls. An old install can look safe when it is not safe.

Install steps, subpath exports, module examples, release policy, and API detail are in the README.

Start here: [github.com/attebury/atteguard#readme](https://github.com/attebury/atteguard#readme)
