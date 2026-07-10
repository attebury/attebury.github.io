---
title: "SkillPress: agent guidance as installable packages"
description: Announcing SkillPress, an open source package manager for agent guidance.
date: 2026-07-10
tags:
  - open-source
  - agentic-development
  - tools
  - skillpress
---
I'm open-sourcing [SkillPress](https://github.com/attebury/skillpress). I built it for the same reason I built ReleasePress: I had too many moving parts and not enough control over what was actually installed.

Once you're developing more than one CLI tool with agent skills, the skills stop feeling like documentation and start feeling like dependencies. Runlane has skills. ReleasePress has skills. Remogram has skills. They live in the repo under `agent-skills/src`, scoped by tool, with contracts and policy rules wrapped around them. That's the canonical source.

But agents don't read the repo. They read what's installed.

Codex looks in `~/.codex/skills`. Cursor wants rules under `.cursor/rules/skillpress`. Claude Code has its own tree. Antigravity has another. Each surface wants a slightly different shape, and each one is easy to edit by hand when you're in a hurry. So we do. We patch the installed copy, tell ourselves we'll backport it later, and then we can't remember which machine has which version of which skill.

That's not a workflow. That's drift with extra steps.

SkillPress treats provider directories as install caches, not source. You edit skills in the repo. SkillPress syncs them to the right provider surface, records hashes in the installed header, and gives you commands to inspect what's stale before you trust it.

```bash
skillpress status --json --config skillpress.config.json
skillpress doctor --json --tool runlane --provider codex
skillpress sync --json --config skillpress.config.json --provider cursor --tool releasepress
skillpress repair-plan --json
```

`status` tells you what's installed and where. `doctor` runs policy checks against the source tree: frontmatter shape, unsafe command patterns, interactive prompts that'll block CI, that kind of thing. `sync` pushes canonical skills into a provider target. `repair-plan` is read-only. It tells you what needs a resync without rewriting anything behind your back.

SkillPress doesn't write the skills. It doesn't promote CLI binaries. It doesn't run lanes or decide merge authority. It owns one narrow job: get the right guidance onto the right surface, keep the install honest, and make drift visible before it becomes habit.

If you're running multiple agent tools against the same product repo, you've probably already felt this. You fix a skill in source, open Cursor, and nothing changes because Cursor is still reading yesterday's cache. Or you fix it in the cache because it's faster, and the repo falls behind. SkillPress is built to keep that boundary clean.

It's early. The policy packs are strict on purpose. The installed headers are there so you can see when a provider copy is lying to you.

Source and docs: [github.com/attebury/skillpress](https://github.com/attebury/skillpress)
