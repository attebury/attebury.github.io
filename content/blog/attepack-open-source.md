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

Attepack is a library for JSON packets. Use it when your tool sends JSON to agents or to automation.

A packet must have these fields: `type`, `schema_version`, `observed_at`, and `ok`. You can also set provider data so a consumer knows which forge or repo made the packet.

Attepack gives shared code to build packets, check packets, and clean error data. You do not need to copy this code into every repo.

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

All error codes are in one list. Error messages and detail objects go through [Atteguard](https://github.com/attebury/atteguard) before output. Atteguard removes secrets and home directory paths. A tool can fail and leak a token at the same time. Attepack tries to stop that leak.

When a tool changes data, Attepack can make a receipt. The receipt can include digests and readback status. Diagnostic events have a separate builder. The sink path uses `execFile`. It does not use a shell string.

Attepack does not contain your domain logic. It contains the envelope, the error shape, and the cleaning rules for both.

Source and docs: [github.com/attebury/attepack](https://github.com/attebury/attepack)
