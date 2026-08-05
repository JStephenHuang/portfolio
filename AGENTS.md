# portfolio overview

This repository is a nextjs starter repo with extremely scalable, clear, documented, and conventional code for starting a Next.js project.

## Stack

- Headless component library: Ark UI (`@ark-ui/react`)
- Styling: TailwindCSS + regular css
- Form logic: React Hook Form + Zod (via `@hookform/resolvers` `zodResolver`)
- Class names: `classnames`
- Linting: ESLint
- Formatting: Prettier

## Setup

After cloning the template, run `pnpm setup` (or `pnpm setup "My App"`). It prompts for a
project name, renames the project (`package.json`, this file's title, `README.md` heading),
resets git history with a fresh initial commit, and removes the `scripts/` directory itself.

## Coding Conventions

- Use arrow functions with `:React.FC<Props>` or `React.ComponentProps<Type>` or `React.ComponentPropsWithRef<Type>`.
- Use functional error handling methods under `error.ts`.
- Use Motion for interface animations when possible; reserve CSS transitions for cases Motion cannot reasonably control.
- Don't add comments
- Don't run lint and tests after every change but ONLY when specified by the user

## Commands

- Use `pnpm dev` to start dev instance
- Use `pnpm add [dep-name]` to add dependencies
- Use `pnpm remove [dep-name]` to remove dependencies
- Use `pnpm lint` to run eslint
- Use `pnpm setup` once after cloning to rename the project

## Agent Instructions:

Before modifying files, present the proposed changes and wait for explicit user approval.

1. Yes, proceed once
2. Yes, and remember/allow similar commands
3. No, and tell Codex what to do differently
4. No, stop
