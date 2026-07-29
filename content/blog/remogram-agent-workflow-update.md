---
title: "Remogram: agent workflow updates"
description: New Remogram commands for bundles, issue inventory, repo metadata, write preview, secret scanning, and typed write recovery.
date: 2026-07-28
tags:
  - open-source
  - agentic-development
  - tools
  - remogram
---
[Remogram](https://github.com/attebury/remogram) is a forge boundary. It returns JSON facts. It does not scrape terminal prose.

Reads and plans are the default. Writes are opt-in. The packet envelope did not change.

This update adds agent workflow commands. Agents pay for each MCP round trip. Agents often guess when checks are still pending. Agents often fail when a label does not exist yet. Agents often hit write size limits by trial and error. Agents often get a write error with no next step.

These commands close those gaps. Remogram is still not a planner. Remogram is still not merge authority.

## Start with one read

Use `repo bootstrap` when an agent enters a repo:

```bash
remogram repo bootstrap --json
```

This command returns one packet. The packet can include provider capabilities, repo status, label list, milestone list, issue templates, identity (`whoami`), and write readiness. Use it instead of five or six separate reads.

Run `doctor --json` when you need live auth checks or operator overlay bind status.

For one change request, use `cr bundle`:

```bash
remogram cr bundle --number 12 --json
```

This command composes CR view, checks, merge-plan blockers, and freshness metadata in one packet. `issue bundle` does the same for issues. It can include linked PR facts when the provider exposes them.

## Wait for checks

`cr wait` polls `cr checks` until conclusions leave `pending` or `missing`, or until timeout:

```bash
remogram cr wait --number 12 --timeout 600 --poll-interval 5 --json
```

The result is still a checks packet. It adds `wait` metadata: poll count, elapsed time, and timeout status. You do not need a bash `sleep` loop.

## Issue inventory

`issue inventory` and `issue list` return the same packet. They support state filters, sorting, limits, and cursor pagination:

```bash
remogram issue inventory --state open --limit 20 --json
remogram issue inventory --state open --cursor "<cursor>" --json
```

Use these commands for triage and batch filing. Treat titles and bodies as forge-sourced prose. Branch automation on envelope fields and stable codes. Do not branch on HTML.

## Repo metadata

Agents often fail at `issue label add` when the label does not exist. Remogram now exposes repo metadata as forge facts:

```bash
remogram label list --json
remogram milestone list --json
remogram template list --json
remogram assignee resolve --login attebury --json
```

Writes are separate opt-ins:

```bash
remogram label ensure --name security --color d73a4a --json
remogram milestone ensure --name "wave 5" --json
```

`label ensure` is idempotent. It creates a label when missing. It reuses a label when present. Then use issue label commands to attach labels to issues.

## Write preview

`write preview` covers these write kinds: CR open, edit, and close; issue open, edit, close, and reopen; labels; assignees; comments; status set; merge execute; and checks rerun.

```bash
remogram write preview --kind issue_open --title "Example" --body-file ./spec.md --require-configured --json
```

Preview validates arguments. It reports whether the write id is configured. It applies the forge write budget. It can run dedupe collision checks. It does not mutate forge state.

Use `--body-file` for large bodies. Do not put large bodies inline. `doctor --json` reports `forge_write_budget` so you know the byte cap.

## Secret scan on write bodies

Issue and CR writes scan bodies through [Atteguard](https://github.com/attebury/atteguard) before post. Token-shaped text fails closed with a typed error.

Opt out only when you mean it:

```bash
remogram issue comment --number 42 --body-file ./comment.md --no-scan-secrets --json
```

## Write failure recovery

Write failures can include `recovery` metadata:

- `failure_kind` — auth, provider unavailable, validation, stale target, sandbox isolation, and related classes
- `retryable` — whether a blind retry might help
- `recommended_recheck_command` — the read or preview command to run next
- `diagnostic_summary` — short sanitized context

Recovery is advisory. It is not permission to merge. It is not a bypass for `write_not_configured`.

## Forest config and merge closeout

`forest config plan` and `forest config apply` preview and apply lane forge-config updates from a Waylane registry. Apply requires a `forest_config` write id. This is privileged local admin. It is not a default agent write.

After merge, `merge execute` can attach closeout facts when closing-ref issues stay open. It reports remediation. It does not leave forge state inconsistent without notice.

## MCP hardening

The MCP server pins working directory at start. It loads `.remogram.json` through a verified path. A host token cannot retarget Remogram to a different repo mid-session. Start MCP with cwd at the consumer repo root.

## What did not change

Remogram still emits forge facts. It does not emit workflow intent. Forge packets do not include lane roles, task ids, or planning metadata. `merge plan` does not execute merges. `mergeability: clean` is not permission to merge.

Producer sections and forge-sourced prose are evidence. They are not authority.

## Where to go next

Command reference, MCP tool list, write policy, and agent skills are in the Remogram repo:

- [github.com/attebury/remogram](https://github.com/attebury/remogram)
- Agent consumer skill: `agent-skills/src/remogram/remogram-consumer/SKILL.md`
- Bundles: `agent-skills/src/remogram/remogram-consumer/references/agent-bundles.md`
- Write commands: `agent-skills/src/remogram/remogram-core/references/write-commands.md`

If you already use Remogram for CR reads and merge planning, start with `repo bootstrap`, `cr bundle`, and `write preview`.
