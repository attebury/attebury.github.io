---
title: "Attepack: shared packet envelopes for JSON-first tools"
description: Announcing Attepack, an open source library for packet envelopes, error normalization, and mutation receipts.
date: 2026-07-27
tags:
  - open-source
  - agentic-development
  - tools
  - attepack
---
I'm open-sourcing [Attepack](https://github.com/attebury/attepack).

If your tool speaks JSON to agents or automation, you probably already have opinions about packet shape: `type`, `schema_version`, `observed_at`, `ok`, maybe provider attribution so a consumer knows which forge or repo produced the fact. Attepack is where I put the shared code for building, validating, and sanitizing those packets so I don't rewrite it in every repo.

```js
import { buildPacketEnvelope, buildErrorPacket, buildMutationReceipt } from "attepack";

const envelope = buildPacketEnvelope({
  type: "example.forge_facts.v1",
  ok: true,
  providerId: "gitea",
  remoteName: "origin",
  repoId: "owner/repo",
});
```

Error codes live in one registry. Error messages and detail objects get scrubbed through [Atteguard](https://github.com/attebury/atteguard) before they hit output, because the worst time to leak a token is when you're already failing. Mutations can emit receipts with digests and readback status. Diagnostic events have their own builder and a sink path that uses `execFile`, not a shell string.

Attepack doesn't own your domain logic. It owns the envelope, the error shape, and the hygiene around both.

Source and docs: [github.com/attebury/attepack](https://github.com/attebury/attepack)
