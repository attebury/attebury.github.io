---js
const eleventyNavigation = {
	key: "Tools",
	order: 3
};
---
# Tools

Open source tools for agentic development. Each tool has a GitHub repository and a post on this site.

## [Attefact](https://github.com/attebury/attefact)

Evidence and verification engine. Attach independently checkable evidence to a claim, keep that evidence honest over time, and detect when it rots.

[GitHub](https://github.com/attebury/attefact) · [Post](/blog/attefact-open-source/)

## [Atteguard](https://github.com/attebury/atteguard)

Shared security code for CLI tools and agent tools. Path containment, secret scanning, argv allowlists, git ref checks, and signature verification with a caller-supplied trusted key.

[GitHub](https://github.com/attebury/atteguard) · [Post](/blog/atteguard-open-source/)

## [Attepack](https://github.com/attebury/attepack)

Shared packet envelopes for JSON-first tools. Envelope build and validation, error codes, message clean-up through Atteguard, and mutation receipts.

[GitHub](https://github.com/attebury/attepack) · [Post](/blog/attepack-open-source/)

## [ReleasePress](https://github.com/attebury/releasepress)

Local promotion and export hygiene for CLI tools. Export a public tree from an allowlist, scan for secrets, and publish only after review.

[GitHub](https://github.com/attebury/releasepress) · [Post](/blog/releasepress-open-source/)

## [Remogram](https://github.com/attebury/remogram)

Forge boundary for agents. Remogram returns provider-attributed JSON facts from Gitea, GitHub, or GitLab. Reads and plans are the default. Writes are opt-in.

[GitHub](https://github.com/attebury/remogram) · [Post](/blog/remogram-open-source/)

## [SkillPress](https://github.com/attebury/skillpress)

Package manager for agent guidance. Sync skills from a canonical repo source into Cursor, Codex, Claude Code, and related surfaces without hand-edited install drift.

[GitHub](https://github.com/attebury/skillpress) · [Post](/blog/skillpress-open-source/)
