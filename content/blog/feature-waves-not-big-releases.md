---
title: Feature Waves, Not Big Releases
description: AI-assisted teams may organize software work around coordinated feature waves instead of stack ownership or unrelated release bundles.
date: 2026-05-29
tags:
  - agentic-development
  - field-notes
---
If software work keeps compressing, release planning may change too.

The old pattern is familiar. A company plans a release. The release collects features, fixes, migrations, compliance work, and cleanup. Some of that work belongs together. Much of it doesn't. It ships together because the process, calendar, or staffing model needs a bundle.

AI may weaken that bundle.

Not because planning disappears. Not because releases disappear everywhere. But because the useful unit of coordination may become smaller, more coherent, and more fluid.

The memorable shape is feature waves.

## The bundle starts to break

Big releases often mix unrelated work because teams are organized around scarce stack capacity. One team owns the front end. Another owns the API. Another owns data. Another owns infrastructure. A feature crosses those stacks, waits for availability, collects dependencies, and eventually joins a release train.

That made sense when the stack boundary was also the people boundary.

If AI lowers the cost of crossing stack boundaries, that boundary may matter less. A product owner may not need to wait for a Python specialist to make a small API change. A designer may not need a dedicated front-end engineer for every component state. A developer may not need hours of repo reading before touching unfamiliar code.

That doesn't make the work easy. It moves the coordination problem.

The hard question may shift from who knows this stack to who understands this wave.

## A wave is a coherent change

A feature wave isn't just an epic with a better name. It's a coordinated slice of product intent, system change, and proof.

It might include:

- A product need or customer problem.
- The workflows and screens affected.
- The capabilities, data, and rules that have to change.
- The tests, proof, and review criteria that define done.
- The people taking temporary responsibility for product judgment, code, design, and verification.

The wave is organized around what should become true, not which team owns which layer.

That makes it feel related to continuous deployment, but at the level of product change. Continuous deployment made it normal to push small code changes quickly. Feature waves may make it normal to push small coherent product changes quickly.

## Roles may rotate around the wave

If this happens, teams may organize less around permanent stack ownership and more around temporary responsibility.

For one wave, the strongest Python developer may lead the code path. Someone else may act as product owner and reviewer. A designer may own the user experience and acceptance criteria. An agent may do the mechanical implementation after the team names the boundaries.

For the next wave, those roles may change.

The person who reviewed the Python change may lead implementation for a TypeScript feature because they know that product surface best. The strongest engineer may step back from coding and focus on proof because the riskiest part of the wave is behavior, not syntax. A domain expert may drive the requirement while an agent handles scaffolding and tests.

The team becomes less like a static org chart and more like a small group forming around the shape of the work.

If AI makes unfamiliar stacks less costly to work in, experience may matter differently. Deep technical judgment still matters. But the most useful person for a wave may be the person who understands the need, the boundary, or the proof best.

## Fluid work needs stronger memory

This is where the speculation gets uncomfortable.

If work gets more fluid, coordination has to get better. Otherwise the team just moves faster into confusion.

The old system had friction, but some of that friction was useful. Stack ownership created memory. Release gates forced review. Specialists knew where the sharp edges were. Slow handoffs made people explain what they were doing.

AI can remove some of that friction. It can also remove some of that memory.

So the team needs another way to preserve structure:

- What wave is this change part of?
- What product need justifies it?
- Which surfaces, workflows, entities, and rules are affected?
- Who is acting as product owner, implementer, designer, and reviewer?
- What proof says the wave is done?
- What should not change?

Those questions become more important when roles are fluid. You can't answer them only in chat and expect the answers to survive the next wave.

## A possible shape

AI-assisted teams may not move from big releases straight to chaos. They may move toward smaller coordinated waves.

One wave improves onboarding. Another changes billing. Another cleans up permission boundaries. Another updates a design system pattern across a few surfaces. Each wave has product intent, affected scope, owners, and proof. Each can move quickly because it doesn't wait for a large unrelated bundle.

That future isn't guaranteed. Some domains need formal releases. Some teams will keep stack ownership because the cost of mistakes is high. Some work will always require deep specialist experience.

But if software work keeps compressing, the team may stop asking, "Which stack team owns this?"

It may start asking, "What wave are we in, who is strongest for this part, and what proof makes the change true?"
