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
[Remogram](https://github.com/attebury/remogram) started as a forge boundary: JSON facts in, prose scraping out. That part has not changed. Reads and plans stay the default. Writes stay opt-in. The trusted envelope is still the contract.

What changed is the agent workflow around it. Agents pay for every MCP round trip. They guess when checks are still pending. They open issues before labels exist. They trial-and-error large write bodies until the forge rejects them. They get a 422 and do not know which read command to run next.

This update closes those gaps without turning Remogram into a planner or a merge authority.

## Start with one read

`repo bootstrap` composes the preflight agents should run before they trust anything else:

```bash
remogram repo bootstrap --json
```

The packet combines provider capabilities, repo status, label and milestone lists, issue templates, identity (`whoami`), and write readiness in one call. Use it instead of chaining five or six separate reads when an agent enters a repo cold. Run `doctor --json` separately when you need live auth checks or operator overlay bind status.

For a single change request, prefer `cr bundle` over ad-hoc scripts:

```bash
remogram cr bundle --number 12 --json
```

It composes CR view, checks, merge-plan blockers, and freshness metadata in one forge-backed packet. `issue bundle` does the same for issues, including linked PR facts when the provider exposes them.

## Wait for checks without a shell loop

`cr wait` polls `cr checks` until conclusions leave `pending` or `missing`, or until timeout:

```bash
remogram cr wait --number 12 --timeout 600 --poll-interval 5 --json
```

The result is still a checks packet. It adds bounded `wait` metadata: polls, elapsed time, whether the wait timed out. Agents stop improvising `sleep` loops in bash.

## Issue inventory that agents can actually use

`issue inventory` and `issue list` (same packet) now support state filters, sorting, limits, and cursor pagination:

```bash
remogram issue inventory --state open --limit 20 --json
remogram issue inventory --state open --cursor "<cursor>" --json
```

Use this for triage and batch filing. Treat titles and bodies as forge-sourced prose. Branch automation on envelope fields and stable codes, not on HTML.

## Repo metadata before you write

Agents used to fail at `issue label add` because the label did not exist yet. Remogram now exposes repo metadata as forge facts:

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

`label ensure` is idempotent. Create if missing, reuse if present. Then attach labels to issues through the existing issue label commands.

## Rehearse writes before they hit the forge

`write preview` covers the major write kinds now: CR open/edit/close, issue open/edit/close/reopen, labels, assignees, comments, status set, merge execute, and checks rerun.

```bash
remogram write preview --kind issue_open --title "Example" --body-file ./spec.md --require-configured --json
```

Preview validates args, reports whether the write id is configured, applies the forge write budget, and can run dedupe collision checks. It does not mutate forge state.

Large bodies belong in `--body-file`, not inline. `doctor --json` reports `forge_write_budget` so agents stop guessing the byte cap.

## Default secret scan on write bodies

Issue and CR writes now scan bodies through Atteguard before post. Tokens and credential-shaped text fail closed with a typed error instead of landing on the forge.

Opt out only when you mean it:

```bash
remogram issue comment --number 42 --body-file ./comment.md --no-scan-secrets --json
```

Forge hygiene should not become accidental credential export.

## Typed recovery when writes fail

Write failures can now carry bounded `recovery` metadata:

- `failure_kind` — auth, provider unavailable, validation, stale target, sandbox isolation, and related classes
- `retryable` — whether a blind retry might help
- `recommended_recheck_command` — the exact read or preview to run next
- `diagnostic_summary` — short, sanitized context

Recovery is advisory. It is not permission to merge and not a bypass around `write_not_configured`.

## Forest config and merge closeout

`forest config plan` and `forest config apply` preview and apply lane forge-config updates from a Waylane registry. Apply requires an explicit `forest_config` write id. This is privileged local admin, not a default agent write.

Post-merge, `merge execute` can attach bounded closeout facts when closing-ref issues remain open. It reports remediation instead of silently leaving forge state inconsistent.

## MCP hardening

The MCP server now pins working directory at start and loads `.remogram.json` through a verified path. Host tokens cannot retarget Remogram to a different repo mid-session. Start MCP with cwd at the consumer repo root.

## What did not change

Remogram still emits forge facts, not workflow intent. You will not find lane roles, task ids, or planning metadata in forge packets. `merge plan` still does not execute merges. `mergeability: clean` still is not permission to merge.

Producer sections and forge-sourced prose are still evidence, not authority.

## Where to go next

Command reference, MCP tool list, write policy, and agent skills live in the Remogram repo:

- [github.com/attebury/remogram](https://github.com/attebury/remogram)
- Agent consumer skill: `agent-skills/src/remogram/remogram-consumer/SKILL.md`
- Bundles: `agent-skills/src/remogram/remogram-consumer/references/agent-bundles.md`
- Write commands: `agent-skills/src/remogram/remogram-core/references/write-commands.md`

If you already use Remogram for CR reads and merge planning, start with `repo bootstrap`, `cr bundle`, and `write preview`. That is where the agent workflow got tighter.
