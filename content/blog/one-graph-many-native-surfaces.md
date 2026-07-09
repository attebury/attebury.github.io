---
title: One Graph, Many Native Surfaces
description: AI may change cross-platform app development from one UI framework to one product graph with native surface outputs.
date: 2026-05-30
tags:
  - agentic-development
  - field-notes
---
Cross-platform frameworks have always chased a hard promise: build once, reach many platforms.

Frameworks like .NET MAUI, Flutter, React Native, and earlier hybrid stacks try to reduce the cost of shipping web, iOS, Android, and desktop apps. They package platform differences behind shared code, shared components, or shared runtime layers.

That has real value.

But AI may change the thing we most need to share.

If agents can produce more of the implementation, the most valuable shared asset may not be one UI framework.

It may be one product graph.

## Shared code is not shared intent

Shared code solves a real problem. It reduces duplication. It keeps business logic from being rewritten four times. It can help a company ship a mobile app without building separate native teams from scratch.

But shared code also creates pressure.

The app may feel less native. Navigation may get awkward. Accessibility, gestures, offline behavior, and performance may not line up cleanly across targets. The team can spend as much time working around the abstraction as using it.

That doesn't mean cross-platform frameworks are wrong.

It means shared code is not shared product intent.

The better question is: what should actually be shared?

## The shared layer may move up

The useful shared layer may move above the UI framework.

Instead of asking one framework to make every platform feel right, teams may ask one graph to describe what should stay true.

The graph should answer:

- Which capabilities exist.
- Which entities and workflows matter.
- Which surfaces users need.
- Which widgets and states belong on each surface.
- Which rules constrain behavior.
- Which accessibility and localization promises apply.
- Which proof says the experience works.

From there, agents or generators could produce different native outputs.

The web app could use web-native patterns. The iOS app could use iOS-native navigation and controls. The Android app could use Android-native conventions. The desktop app could use desktop affordances.

The shared layer wouldn't be a lowest-common-denominator UI. It would be the product map.

## Agents may work better natively

An agent working on an iOS app may be more effective in a native iOS environment than inside a generic cross-platform abstraction. The compiler, simulator, platform APIs, accessibility tools, and design conventions all give the agent stronger feedback.

The same may be true on Android, desktop, and web.

The agent doesn't have to guess whether a custom abstraction maps cleanly to the platform. It can work with the platform directly. It can run platform-specific tests. It can inspect native warnings. It can use native components the way a human specialist would.

But that only works if the agent has a shared source of intent.

Without one, every native surface becomes its own interpretation of the product. The iOS app drifts. The web app drifts. The Android app drifts. Desktop becomes the odd surface nobody quite trusts.

Native output is powerful only if we can keep the product coherent.

## One graph, many native surfaces

The possible shape is one graph, many native surfaces.

The graph describes the product. Each surface implements that product in the right platform language.

That could mean:

- One capability appears on web, iOS, Android, and desktop.
- Each platform gets native layout, navigation, and interaction patterns.
- Shared rules define behavior, not pixels.
- Surface records describe what each platform owes the user.
- Agents generate or maintain platform-specific code from the same intent.
- Reviewers compare each output against the graph and proof.

This isn't write once, run everywhere.

It's closer to spec once, realize everywhere.

The implementation can differ. The product contract should not.

## What happens to .NET MAUI

This isn't an argument that .NET MAUI goes away.

Frameworks like .NET MAUI solve real problems. Some teams want a unified codebase. Some apps are similar enough across platforms that one framework is the right tradeoff. Some organizations would rather accept platform compromises than staff multiple native surfaces.

AI doesn't erase that.

But it may create another path.

A team may not need one cross-platform UI layer for every target if agents can help maintain several native targets from the same product graph.

That changes the tradeoff.

The question may stop being: which framework lets us share the most code?

It may become: which shared graph lets us keep the most product coherence while each platform stays native?

## A possible shape

If AI keeps lowering the cost of implementation, cross-platform development may become less about one runtime and more about one coordinated source of truth.

Some teams will still use frameworks like .NET MAUI because shared code is the right constraint. Others may choose native surfaces because agents can carry more of the implementation load.

In that world, the valuable asset isn't just the app code. It's the graph that tells every surface what should stay true.

The future may not be one app that runs everywhere.

It may be one product map that helps every surface feel like it belongs.
