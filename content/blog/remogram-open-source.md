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

That's the distinction I care about. Remogram emits facts. Runlane, Worklane, and whatever planning layer you use can interpret intent and route work. Those concerns stay outside Remogram's JSON on purpose. You won't find lane roles, task ids, or handoff metadata mixed into forge packets. If planning concepts leak into the fact layer, every consumer inherits the wrong abstraction.

Remogram also ships as an MCP server. Same commands, same packets, same boundaries. Point it at a repo with `.remogram.json` and agents can inspect forge state without improvising shell pipelines.

If you're dogfooding multiple CLI tools against a private forge while keeping public release paths separate, you've probably hit this already. You want agents to open a change request, read checks, and report blockers without becoming merge authority. Remogram is built for that narrow job.

It's early. The packets are strict. The write surface is closed by default. Forge-sourced strings are treated as untrusted prose even when the envelope is good.

Source and docs: [github.com/attebury/remogram](https://github.com/attebury/remogram)
