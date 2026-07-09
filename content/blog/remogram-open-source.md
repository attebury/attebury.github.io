---
title: Remogram is open source
description: Announcing Remogram, an open source forge boundary for agent-readable JSON facts.
date: 2026-07-11
tags:
  - open-source
  - agentic-development
  - tools
  - remogram
---
I'm open-sourcing [Remogram](https://github.com/attebury/remogram). I built it because agents kept guessing about forge state, and the tools we had were built for humans reading prose in a terminal.

I run a local Gitea installation for most of my development work. That's been good for previewing changes and keeping public repos separate from the mess on my machine. But once agents entered the workflow, the forge became another surface that needed a contract. An agent doesn't need a paragraph about pull request #47. It needs to know whether the head is stale, whether checks finished, whether merge is blocked, and what the forge actually thinks the base and source refs are.

The official CLIs can get you there, if you're willing to scrape text and hope the format doesn't change. That's fragile, and it mixes up two jobs that shouldn't share a pipe: reading forge state and deciding what to do about it.

Remogram sits at the boundary. It talks to Gitea, GitHub, or GitLab through HTTP APIs and returns provider-attributed JSON facts. Read and plan by default. Writes are opt-in, listed explicitly in config, and gated so an agent can't merge or publish by accident because the command happened to exist.

```bash
remogram doctor --json
remogram repo status --json
remogram cr view --number 1 --json
remogram cr checks --number 1 --json
remogram merge plan --number 1 --json
```

`doctor` checks config, auth presence, provider capabilities, and write policy before you trust anything else. `cr view` reconciles forge-reported SHAs against your local git. If the head drifted, you get `stale_head`, not a silent lie. `merge plan` lists blockers. It doesn't execute a merge. `mergeability: clean` means the git side looks conflict-free. It is not permission to merge.

Every forge packet carries the same trusted envelope: `type`, `schema_version`, `provider_id`, `remote_name`, `repo_id`, `observed_at`, and `ok`. That's the part you build automation against. Titles, URLs, and descriptions are forge-sourced prose. Treat them as untrusted even when the envelope is good.

![Remogram trusted packet envelope](/img/blog/remogram/trusted-envelope.png)

That's the distinction I care about. Remogram emits facts. Runlane, Worklane, and whatever planning layer you use can interpret intent and route work. Those concerns stay outside Remogram's JSON on purpose. You won't find lane roles, task ids, or handoff metadata mixed into forge packets. If planning concepts leak into the fact layer, every consumer inherits the wrong abstraction.

Remogram also ships as an MCP server. Same commands, same packets, same boundaries. Point it at a repo with `.remogram.json` and agents can inspect forge state without improvising shell pipelines.

## Writes fail closed

The write surface is closed by default. If an agent tries a command that isn't listed in `write_commands`, Remogram doesn't guess. It returns `write_not_configured` and tells you what to add to config.

![write_not_configured for status_set](/img/blog/remogram/write-not-configured.png)

To opt in, name the commands explicitly:

![Example .remogram.json with write_commands](/img/blog/remogram/config-example.png)

`provider capabilities --json` shows what's implemented, what auth class each write requires, and how idempotency scanning is bounded:

![Provider capabilities and write surface](/img/blog/remogram/provider-capabilities.png)

Once configured, writes return the same kind of structured facts as reads. Open a change request:

![change_request_opened packet](/img/blog/remogram/change-request-opened.png)

Set a commit status:

![commit_status_set packet](/img/blog/remogram/commit-status-set.png)

The full packet still carries provider attribution and timestamps:

![commit_status_set with full envelope](/img/blog/remogram/commit-status-set-full.png)

If you're dogfooding multiple CLI tools against a private forge while keeping public release paths separate, you've probably hit this already. You want agents to open a change request, read checks, and report blockers without becoming merge authority. Remogram is built for that narrow job.

It's early. The packets are strict. The write surface is closed by default. That's the point.

Source and docs: [github.com/attebury/remogram](https://github.com/attebury/remogram)
