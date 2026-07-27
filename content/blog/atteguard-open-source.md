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

## Install

```bash
npm install atteguard
```

The package uses subpath exports. You import only the module you need.

```js
import { resolveContainedPath } from "atteguard/path-safety";
import { validateAllowlistedCommand } from "atteguard/command-safety";
import { redactSensitiveTextForSecurity } from "atteguard/text-safety";
import { verifyPayloadSignature } from "atteguard/signing";
import { checkAuthorityClaims } from "atteguard/authority";
```

## Modules

| Module | Use it when you need to |
| --- | --- |
| `path-safety` | Keep a file or directory inside a trusted root. The check resists symlink escape. |
| `text-safety` | Scan text for secrets. Redact secrets before you log or emit JSON. |
| `command-safety` | Allow only approved argv shapes. Reject raw shell strings and undeclared env vars. |
| `git-safety` | Run local git commands with ref validation before a subprocess starts. |
| `cli-safety` | Validate CLI flag contracts. Format errors without leaking workspace data. |
| `signing` | Sign or verify payload files. The trusted public key must come from your config. |
| `authority` | Check that `authority-claims.json` matches actual write call sites in source. |
| `telemetry` | Validate diagnostic event shape. Scan event strings with the same secret rules. |

## Path safety

`resolveContainedPath` runs two checks. First it checks the path against the root before symlink resolution. Then it checks the canonical path against the root after `realpath`. A symlink inside the root cannot point outside the root and still pass.

Use `resolveContainedFilePath` when the target must be a regular file. It rejects symlinked files.

Do not use `isPathInside` alone when symlinks may be present. It is a lexical check only.

## Command and git safety

`validateAllowlistedCommand` accepts only argv that matches a pre-declared template. Literal tokens must match exactly. Typed slots such as `integerArg()` match by pattern. The validator also checks command `cwd` against a trusted root when you set one.

`gitRevParseSafe` and related helpers call `git` through `execFile`. They validate ref strings before the subprocess starts. A ref must not start with `-` or contain `..`.

## Signing

`verifyPayloadSignature` requires `expectedPublicKeyPem` from the caller. It never uses the public key embedded in the signature packet for verification. Without that rule, anyone can make a key pair, sign data, and embed their own key in the packet.

`loadCanonicalPayload` canonicalizes JSON before digest and sign operations. It rejects symlinked payload paths.

## Authority claims

A repo can ship `authority-claims.json`. The file lists guard functions and the write call sites they must protect. `checkAuthorityClaims` parses governed source files with an AST. It finds `fs.writeFileSync`, `fs.copyFileSync`, and related calls. It reports registered sites that are missing, and write calls that are not registered.

A passing report means the registry and the source agree. It is not proof that every runtime path is safe.

## Tests and versions

Each module ships adversarial tests named `*.self-issued.test.js`. These tests encode the exploit that the module must block.

You must pin an exact version. These are trust primitives. An old version can look safe when it is not safe. The project is pre-1.0.

Atteguard does not grant merge, release, or workflow authority. Your tool must wire each primitive into every path that needs it.

Source and docs: [github.com/attebury/atteguard](https://github.com/attebury/atteguard)
