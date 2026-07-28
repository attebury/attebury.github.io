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

I built it because the Forest tool stack kept converging on the same JSON packet shape without sharing the code that enforces it. Remogram emits forge facts. Waylane emits execution facts. Verigram emits work judgments. Atteway emits audit view models. They all need `type`, `schema_version`, `observed_at`, and `ok`. They all need stable error codes when something fails. Each repo was carrying its own copy of the envelope builder, or a partial copy, or a copy that had not caught up yet.

That is not a documentation problem. It is schema drift with extra steps. One tool adds provider attribution fields. Another tool forgets. A third tool puts the timestamp in a different place. Agent automation starts branching on three dialects of the same idea.

## The pattern

Error output is the painful case. A command fails on a bad path or a missing config key. The error message includes a home directory path and a token that was in the environment. The packet says `ok: false`, but the leak is already in `error_message`. The agent logs the JSON and the secret leaves the workspace.

Mutation is the second case. A tool changes forge state or writes a local file. The CLI prints success prose. Nothing records what changed, what was intended, or whether readback matched. You cannot audit the action later except from shell history.

Facts versus diagnostics is the third case. A routing failure gets emitted with the same envelope as a forge fact. Downstream code treats a diagnostic event like merge authority. The boundary was never explicit in the packet shape.

## What Attepack is for

Attepack holds the shared plumbing for JSON-first tools. Envelope build and validation. A single error code registry. Error message and detail cleaning through [Atteguard](https://github.com/attebury/atteguard) text-safety. Mutation receipts with digests and readback status. A separate diagnostic event builder that emits through `execFile`, not a shell string.

It is a library. It does not contain your domain logic. Remogram still owns forge fact types. Waylane still owns execution facts. Attepack owns the envelope, the error shape, and the hygiene around both.

## Example

A forge read fails because write commands are not configured. The tool should emit a structured error, not a string that echoes the config snippet and the workspace path.

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

Attepack normalizes the error code, scrubs paths and secrets from messages and allowlisted detail fields, and keeps the envelope shape the same as a success packet. Automation can branch on `error_code`. It does not need to parse prose.

Reads and writes stay different artifacts. Fact packets answer what the forge observed. Mutation receipts answer what changed and whether readback verified it. Diagnostic events answer what failed in command routing. Attepack gives each one a shape. Your tool still owns the policy of when a mutation is allowed.

Install steps, subpath exports, module layout, and API detail are in the README.

Start here: [github.com/attebury/attepack#readme](https://github.com/attebury/attepack#readme)
