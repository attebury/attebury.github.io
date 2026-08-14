---
title: "Attefact: independently checkable evidence for claims"
description: Attefact is an open source evidence and verification engine for attaching checkable evidence to claims and detecting when it rots.
date: 2026-08-14
tags:
  - open-source
  - agentic-development
  - tools
  - attefact
---
I open-sourced [Attefact](https://github.com/attebury/attefact).

A claim is cheap. Evidence that still matches the claim six months later is not. Most systems store a URL, a screenshot, or a "verified" flag, then treat that as proof forever. Links rot. Pages change. Archives disappear. The flag stays green.

Attefact is a small evidence engine for that problem. It's not a product for one domain. It doesn't decide what a claim means. It answers a narrower question: given a claim, how do you attach independently checkable evidence, keep that evidence honest over time, and leave room for a person to vouch for the parts no public artifact can prove?

v0.2.0 is out. Nine evidence kinds. Three bindings: pin a git object, snapshot a URL and hash the response, or upload a file that has no origin URL. A rot-detection state machine: unverified, live, drifted, unreachable, archived. Insert-only schema for Postgres and SQLite, with triggers that actually block updates and deletes.

If you're building something that has to keep receipts, start here: [github.com/attebury/attefact](https://github.com/attebury/attefact)
