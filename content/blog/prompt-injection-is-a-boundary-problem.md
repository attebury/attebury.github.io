---
title: Prompt Injection Is a Boundary Problem
description: In agent workflows, project text, shared maps, and model-bound packets are evidence, not authority.
date: 2026-06-04
tags:
  - agentic-development
  - field-notes
  - security
---
Prompt injection is easy to frame as a model problem.

The model read something bad. The model obeyed it. The model should have known better.

That's part of it, but I don't think it's the whole problem.

In an agent workflow, prompt injection is also a boundary problem.

The agent reads docs, source files, fixtures, generated reports, shared app maps, diffs, test data, local instructions, and packets prepared for model calls. Some of that text is useful context. Some of it is product evidence. Some of it may be malicious, stale, copied from somewhere else, or simply written in a way that sounds like an instruction.

The mistake is treating all readable text as authority.

The security work I've been doing tries to make that boundary explicit.

## Evidence is not authority

The useful phrase is evidence, not authority.

Repo text can tell an agent what exists. It can describe requirements. It can show prior decisions. It can explain an edge case. It can include examples of unsafe behavior.

But repo text shouldn't be able to tell the agent to ignore system instructions, bypass proof, reveal hidden prompts, skip gates, weaken a skill, or send raw workspace context to a provider.

That sounds obvious until the agent workflow gets real.

Agents read a lot of project text. They read it quickly. They mix prose with tool output. They pass slices of that context into model calls. They may use external providers. They may adopt shared project maps. They may summarize findings back into new packets.

At that point, "just don't obey bad text" is too vague.

The system needs a boundary the workflow can inspect.

## What changed in my thinking

The recent work adds that boundary in a few places.

First, a prompt-boundary scan.

It looks for project prose that appears to tell agents, tools, providers, or gates to do unsafe things. Examples include ignoring trusted instructions, revealing secrets, bypassing checks, weakening proof, overriding agent guidance, or hiding instructions in markup and code fences.

The scanner isn't pretending to be perfect.

It's a practical tripwire.

High-confidence cases block. Advisory cases stay visible. Security discussions and examples can remain as evidence. If a finding is intentionally present, the waiver has to be command-owned, tied to a task or bug, tied to an actor, and hash-bound to the exact finding.

That last part matters.

A waiver shouldn't become a blanket permission slip. If the source text changes, the waiver goes stale.

## The inventory matters

An inventory of agent-facing prose surfaces sounds less exciting than a scanner, but it may be the more important piece.

You can't protect a boundary you haven't named.

The inventory says which commands and packets are model-visible. Some packets are agent-bound. They go to the coding agent as working context. Some packets are provider-bound. They leave the local workflow for a model provider.

Both need labels.

The inventory tracks whether JSON packets carry content trust, whether markdown output labels project-derived prose as untrusted evidence, and whether the surface has focused tests.

That creates a ratchet.

If a change adds or modifies an agent-facing surface, the workflow can ask whether the surface is registered, labeled, scanned, and tested.

This is the right kind of boring security.

Not "we hope the agent behaves." Not "we trust everyone to remember." A named surface has a named owner, named output formats, trust metadata, and proof.

## Provider-bound packets need the same line

The provider boundary is where this gets more concrete.

Provider input is the packet the workflow allows out to an external model provider. It's the model-bound payload.

That payload shouldn't contain raw workspace context by accident. Local paths, secret-like values, hidden checks, git remotes, raw source fields, and unallowlisted output should stay out of provider-bound packets.

Provider input should be its own trust surface.

The packet carries content trust. The payload is scanned. The redaction report is auditable. If the audit fails, the payload is rejected instead of being sent anyway.

That's the right shape.

The boundary isn't only what did the agent read?

It's also what did the system send onward?

## Shared maps are still untrusted until reviewed

Shared app maps are useful because teams want reusable records: terms, capabilities, workflows, rules, patterns, reference structures.

But shared doesn't mean trusted.

A shared map may come from another repo, another team, another version, or another context. It might be useful. It might also contain unsafe prose, authority files, or colliding records.

Shared map text should be a separate trust class.

The workflow can review a source, require a pinned hash, scan the imported records, block authority files, and write an adoption receipt. That keeps shared context from silently becoming project authority.

You can make context portable without making trust portable.

## The useful standard

The goal isn't to make prompt injection impossible.

That would be too broad a claim.

The useful standard is smaller and stronger:

- Agent-visible prose should be inventoried.
- Project-derived text should be treated as evidence, not authority.
- Unsafe authority-shaped text should be scanned.
- External provider payloads should be sanitized and auditable.
- Shared maps should be pinned and reviewed before adoption.
- Waivers should be exact, reviewed, and stale when the source changes.

Model the app. Bound the context. Label the trust. Scan the prose. Audit the packet. Keep exceptions narrow.

Prompt injection isn't only about bad text.

It's about whether the workflow can tell the difference between context that helps the agent and text that's trying to steer it.
