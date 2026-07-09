---
title: When Software Work Gets Shopified
description: AI may compress software roles the way CMS and commerce platforms compressed earlier web work.
date: 2026-05-28
tags:
  - agentic-development
  - field-notes
---
AI can feel like a break from software history, but I think it's more useful to see it as a continuation.

We've been compressing roles for decades. We used to pay one person to design a website, another to code it, another to wire forms, another to publish content, and another to keep the stack running. Then blogs, CMS tools, hosted site builders, and services like Shopify absorbed large parts of that work.

The work didn't disappear. It moved into platforms.

Design became themes and systems. Content publishing became an editor. Commerce became a configured service. Hosting became a deploy button. A single operator could do work that once required a small web team.

AI may do something similar to software development.

## Role compression is the pattern

The important pattern isn't replacement. It's compression.

When platforms mature, they package repeated work into defaults, workflows, and constraints. The old specialist work becomes a product surface. A smaller team can operate at a higher level.

That's what happened to many websites. The average business no longer needs a dedicated designer, front-end developer, back-end developer, hosting operator, and analytics consultant just to sell products online. Shopify compressed much of that into a service.

AI can compress software work in a similar way:

- Scaffolding becomes a prompt or template.
- Boilerplate implementation becomes generated code.
- Refactoring becomes an agent task.
- Test creation becomes a guided loop.
- Documentation updates become part of the change.
- Design translation becomes a conversation with constraints.
- Investigation becomes a context query instead of hours of repo reading.

If that's accurate, entire areas of software development will get platformed. Not all of software, and not all of engineering judgment. But many repeated slices of implementation, maintenance, migration, and glue work will get absorbed into tools and workflows we haven't fully named yet.

## What teams might look like

Smaller teams may cover more surface area.

One person may own product shape, user experience, and implementation for a bounded feature. Another may own platform rules, security posture, release quality, and proof. A designer may work directly with generated components and semantic UI contracts. A domain expert may author workflows and acceptance criteria that agents turn into code.

The team becomes less like a row of specialists passing tickets downstream and more like a small group of operators coordinating systems.

That doesn't make engineering easier. It changes where the difficulty lives.

The hard parts move from reading requirements and typing code to choosing intent, setting boundaries, reviewing generated work, proving behavior, and keeping the system coherent through time.

In that world, the riskiest gap isn't whether an agent can produce code. The risk is whether the agent is changing the right thing for the right reason, in the right part of the system, with the right proof.

## Where AI needs structure

AI coding tools are good at local transformation. They edit files, write tests, explain code, and propose refactors. They're less reliable when the work depends on product intent, ownership, unstated decisions, or system boundaries.

That's where role compression gets messy.

If one person uses AI to do the work of several roles, that person needs more than a faster editor. They need a way to keep the compressed roles from blending together into guesses.

The product decision shouldn't disappear into the implementation. The implementation shouldn't invent the contract. The contract shouldn't ignore proof. Proof shouldn't be an afterthought.

AI makes those separations more important, not less.

## What we still have to carry

I've been building tools for agentic development partly because of this compression. When fewer people cover more roles, the team needs durable answers to boring questions:

- What should be true after this change?
- Who owns this boundary?
- What proof counts as done?
- What context is safe to give an agent, and what is only evidence?

You can answer those in tickets, chat, and memory for a while. Then the team moves faster and the answers stop matching the code.

Compressed teams still need a map of what they're building. AI can help produce the code. We still have to know what should be true, who owns it, what rules apply, and how to prove the change is done.

That's not a product pitch. It's the problem I'm working in.
