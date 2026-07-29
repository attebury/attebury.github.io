---
title: "Attepack: shared packet envelopes for JSON-first tools"
description: Attepack is an open source library for packet envelopes, error control, and mutation receipts.
date: 2026-07-27
tags:
  - open-source
  - agentic-development
  - tools
  - attepack
---
[Attepack](https://github.com/attebury/attepack) is now open source.

I built Attepack because several open tools used the same JSON packet shape. The tools did not share the code that builds and checks that shape. [Remogram](https://github.com/attebury/remogram) emits forge facts. [SkillPress](https://github.com/attebury/skillpress) and [ReleasePress](https://github.com/attebury/releasepress) emit status and receipt packets. Each tool needs `type`, `schema_version`, `observed_at`, and `ok`. Each tool needs stable error codes when a command fails. Each repository kept its own copy of the envelope builder. Some copies were partial. Some copies were out of date.

## The pattern

Error output is one example. A command fails on a bad path or a missing config key. The error message includes a home directory path. The error message also includes a token from the environment. The packet says `ok: false`. The leak is already in `error_message`. The agent logs the JSON. The secret leaves the workspace.

Mutation is a second example. A tool changes forge state or writes a local file. The CLI prints success prose. Nothing records what changed. Nothing records what was intended. Nothing records whether readback matched. You cannot audit the action later except from shell history.

Facts versus diagnostics is a third example. A routing failure uses the same envelope as a forge fact. Downstream code treats a diagnostic event as if it were a forge fact. The packet shape does not mark the boundary.

## What Attepack is for

Attepack puts the shared packet code in one library. The library can:

- Build and validate a packet envelope.
- Use one error code registry.
- Clean error messages and detail fields through [Atteguard](https://github.com/attebury/atteguard) text-safety.
- Build mutation receipts with digests and readback status.
- Build diagnostic events and emit them through `execFile`. It does not emit through a shell string.

Attepack is a library. It is not a CLI. It does not hold your domain logic. Remogram still owns forge fact types. SkillPress and ReleasePress still own their status and receipt types. Attepack owns the envelope, the error shape, and the shared clean-up around both.

## Example

A forge read fails because write commands are not configured. The tool must emit a structured error. The tool must not echo the config text or the workspace path.

```js
import { buildErrorPacket } from "attepack";

const packet = buildErrorPacket({
  type: "example.forge_facts.v1",
  ok: false,
  errorCode: "write_not_configured",
  errorMessage: "Write command is not listed in config",
  providerId: "gitea",
  remoteName: "origin",
  repoId: "owner/repo",
  details: {
    write_command: "cr_open",
    remediation: "Add cr_open to write_commands in .example.json",
  },
});
```

Attepack normalizes the error code. It removes paths and secrets from messages and from allowlisted detail fields. It keeps the envelope shape the same as a success packet. Automation can branch on `error_code`. It does not need to parse prose.

Fact packets, mutation receipts, and diagnostic events stay separate. Fact packets answer what the forge observed. Mutation receipts answer what changed and whether readback verified it. Diagnostic events answer what failed in command routing. Attepack gives each one a shape. Your tool still owns the policy for when a mutation is allowed.

Install steps, subpath exports, module layout, and API detail are in the README.

Start here: [github.com/attebury/attepack#readme](https://github.com/attebury/attepack#readme)
