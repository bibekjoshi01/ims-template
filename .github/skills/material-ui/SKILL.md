---
name: material-ui
description: 'Use when working with Material UI (MUI) components, theming, responsive layouts, customization, or Next.js integration; fetch official docs before making UI changes.'
---

# Material UI

Use this skill when the task involves Material UI or MUI. The goal is to choose the right component or pattern, confirm the official guidance, and apply the smallest correct implementation.

## Workflow

1. Classify the request.

   - Component usage or replacement
   - Styling or theme customization
   - Responsive layout or density changes
   - Integration concerns such as routing, SSR, or Next.js
   - Accessibility, interaction, or test concerns

2. Consult the official docs first.

   - Use the Material UI MCP/docs source when available.
   - Prefer the component, customization, theming, integration, or guide page that matches the request.
   - If the task touches multiple areas, fetch the narrowest set of pages needed to avoid guessing.

3. Decide the implementation path.

   - If a built-in component fits, use it directly.
   - If the design is mostly structural, compose existing MUI primitives instead of introducing custom wrappers.
   - If visual behavior depends on brand tokens, update the theme rather than hard-coding one-off styles.
   - If the app needs framework-specific handling, follow the relevant integration guide before editing code.

4. Check quality before finishing.
   - Match the current codebase style and existing theme conventions.
   - Preserve accessibility semantics, keyboard support, and focus behavior.
   - Keep the change minimal and avoid redundant styling or duplicate abstractions.
   - Validate that the chosen component and props are supported by the current MUI version.

## Decision Rules

- Use component docs when the question is about props, slots, variants, or composition.
- Use theming or customization docs when the request affects shared appearance, spacing, palette, typography, or component overrides.
- Use integration docs when the task involves Next.js, routing, SSR, or style-library interoperability.
- Use guides when the request is about bundle size, testing, responsiveness, or server rendering behavior.

## Completion Criteria

- The implementation follows the official Material UI recommendation for the requested feature.
- Any theme or override changes are placed in the shared styling layer instead of ad hoc component code.
- The result remains consistent across breakpoints and interaction states.
- If anything was ambiguous, ask the smallest useful follow-up question after drafting the best-supported version.
