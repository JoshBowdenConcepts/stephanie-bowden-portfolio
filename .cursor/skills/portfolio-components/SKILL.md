---
name: portfolio-components
description: Requires every new UI element in the Stephanie Bowden portfolio to be built as its own React component, and requires asking the user to name each new component before creating it. Use when adding sections, elements, or markup to pages or layouts in src/app, or when building any new UI for the portfolio.
---

# Portfolio Components

## Rule

Every new element added to the portfolio goes in a component. Do not write new markup inline in `src/app/page.tsx` or `src/app/layout.tsx`; pages and layouts only compose components. Small edits to existing markup (copy changes, style tweaks) don't count.

## Workflow

1. **Reuse first.** Check `src/components/` for an existing component that fits. If one does, reuse or extend it and skip naming.
2. **Announce it.** Tell the user a new component is needed and what it will contain.
3. **Ask for the name.** Use the AskQuestion tool with 1-2 suggested PascalCase names. "Other" is always available for a custom name. Wait for the answer before writing any files.
4. **Create it** using the conventions below.
5. **Report back.** Tell the user the component's name and file path.

## Conventions

- Location: `src/components/<Name>/<Name>.tsx`, with styles in `src/components/<Name>/<Name>.module.css`.
- Default export, with a typed `<Name>Props` interface when it takes props.
- Plain CSS Modules. Use the Geist font variables (`--font-geist-sans`, `--font-geist-mono`) and the existing light palette (`#111111` text, `#666666` secondary, `#e6e6e6` borders, white background).
- Responsive down to mobile (360px wide). Design mobile-first: base styles for small screens, then `@media (min-width: ...)` for larger ones. Use fluid sizing (`clamp()`, `%`, `max-width`) over fixed widths, avoid horizontal scroll, and keep tap targets at least 44px.
- Server Component by default. Add `"use client"` only when the component needs interactivity or browser APIs.
- The site is a static export (`output: "export"` for GitHub Pages). Avoid anything that needs a server at runtime, such as route handlers, server actions, or dynamic rendering.
- Prefix public asset paths with `process.env.NEXT_PUBLIC_BASE_PATH`.

## Example

User: "Add a contact section with my email."

Agent: "This needs a new component for the contact section: a heading and an email link." Then AskQuestion with options `ContactSection` and `Contact`. After the user picks a name, create `src/components/ContactSection/ContactSection.tsx` and `ContactSection.module.css`, render it from `src/app/page.tsx`, and reply: "Created `ContactSection` at `src/components/ContactSection/ContactSection.tsx`."
