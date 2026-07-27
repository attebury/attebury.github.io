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

Attepack is a library for JSON packets. Use it when your tool sends JSON to agents or to automation. It standardizes envelope shape, error codes, error cleaning, mutation receipts, and diagnostic events.

## Install

```bash
npm install attepack
```

```js
import {
  buildPacketEnvelope,
  buildErrorPacket,
  buildMutationReceipt,
  validatePacketEnvelope,
  sanitizeErrorMessage,
} from "attepack";
```

## Envelope fields

Every packet carries these required fields:

- `type` — packet kind, for example `example.forge_facts.v1`
- `schema_version` — integer schema version
- `observed_at` — ISO timestamp
- `ok` — boolean success flag

Builders can also set provider data:

- `provider_id` — forge provider name
- `remote_name` — git remote name
- `repo_id` — owner and repo, for example `owner/repo`

```js
const envelope = buildPacketEnvelope({
  type: "example.forge_facts.v1",
  ok: true,
  providerId: "gitea",
  remoteName: "origin",
  repoId: "owner/repo",
});
```

`validatePacketEnvelope` rejects shape errors. `buildErrorPacket` sets `ok: false` and attaches a normalized `error_code`.

## Error codes and cleaning

Known error codes live in one registry. Examples include `invalid_args`, `path_unsafe`, `write_not_configured`, and `atteguard_sensitive_content`.

Error messages and detail objects pass through [Atteguard](https://github.com/attebury/atteguard) text-safety before output. Home directory paths collapse to `~`. Secret spans become redacted text. Detail objects pass through an allowlist so internal fields do not leak by accident.

A tool can fail and leak a token at the same time. Attepack tries to stop that leak on the error path.

Use `redactSensitiveTextForSecurity` from Atteguard when truncation would hide unchecked text. Attepack uses Atteguard on the error sanitization path.

## Mutation receipts

Reads and writes need different artifacts. `buildMutationReceipt` produces a receipt with:

- `mutation_kind` — what changed
- `identity_digest` and `intent_digest` — SHA256 digests
- optional `pre_state_digest` and `post_state_digest`
- `readback_status` — verification result after the mutation
- the same provider fields as fact packets

`validateMutationReceipt` checks digest shape and receipt id format before you log or forward the receipt.

## Diagnostic events

Attepack ships a `diagnostic.event.v1` builder and validator. The emitter writes the event to a temp file and invokes a configured sink through `execFile`. It does not shell out through a string. Event details are sanitized before emission.

Use diagnostic events for failure class and command scope. Do not use them as forge facts or merge plans.

## Modules

| Module | Purpose |
| --- | --- |
| `attepack/envelope` | Build and validate packet envelopes |
| `attepack/errors` | Normalize error codes |
| `attepack/sanitize` | Clean error messages and detail objects |
| `attepack/receipts` | Build and validate mutation receipts |
| `attepack/diagnostics` | Build, validate, and emit diagnostic events |

## Where it sits

Attepack does not contain your domain logic. It contains the envelope, the error shape, and the cleaning rules for both.

Tools such as Remogram carry their own domain packet types. Attepack holds the shared plumbing so the next tool does not copy envelope code from a README.

It is early. The schema version is 1.

Source and docs: [github.com/attebury/attepack](https://github.com/attepack)
