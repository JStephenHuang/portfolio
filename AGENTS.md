# AGENTS instructions

## Commands

Refer to scripts under [`package.json`](./package.json).

- **Install dependencies**: `pnpm install`
- **Start development server**: `pnpm dev`
- **Create production build**: `pnpm build`
- **Start production server**: `pnpm start`
- **Run ESLint**: `pnpm lint`
- **Add dependency**: `pnpm add <package>`
- **Remove dependency**: `pnpm remove <package>`

Package manager is **pnpm**. Do not use another package manager. Do not run lint, builds, or tests unless the user asks.

## Repository structure

Next.js 16 App Router application using React 19 and strict TypeScript.

- `app/`: routes, layouts, providers, and app-specific components
  - `(portfolio)/`: public gallery and `/dumps/[id]` pages
  - `(admin)/`: `/login` and authenticated `/admin` routes
  - `_components/`: components and contexts shared across app routes
  - `api/auth/`: Auth.js route handlers
- `components/`: reusable components; follow its nested [`AGENTS.md`](./components/AGENTS.md)
  - `ui/`: presentational components
  - `form/`: React Hook Form controls
  - `primitives/`: styled headless components and the Air Hockey interaction
- `lib/`: application logic
  - `action/`: server actions
  - `auth/`: Auth.js configuration, session helpers, and login throttling
  - `data/`: Zod schemas, types, and static portfolio item data
  - `hooks/`: shared client hooks
  - [`error.ts`](./lib/error.ts): functional `Result` error helpers
- `styles/`: global reset, theme variables, and design tokens
- `public/`: portfolio media

Gallery positions and settings are stored in browser local storage. Dump pages currently render metadata from `rootItems`; dump body persistence, rendering, and the admin Markdown editor are not implemented yet.

## Coding standards

### Error handling

- Use the functional `Result` helpers in [`lib/error.ts`](./lib/error.ts) for fallible asynchronous work.
- Preserve Next.js redirect errors when handling server-action or authentication failures.

### React and Next.js

- Default to Server Components. Add `"use client"` only for state, effects, event handlers, browser APIs, or client-only context, and keep the client boundary small.
- Treat App Router `params` and `searchParams` as promises and await them in pages, layouts, and metadata functions.
- Put backend mutations in `lib/action` with `"use server"`.
- Use arrow components with explicit `React.FC<Props>`, `React.ComponentProps<Type>`, or `React.ComponentPropsWithRef<Type>` typing.
- Build forms with React Hook Form, Zod, and `zodResolver`. Use the shared form components and `FormProvider` patterns before creating new controls.
- Use `useTransition` for client-triggered server mutations that need pending feedback.

### Components and styling

- Reuse components from `components/ui`, `components/form`, and `components/primitives` before creating a new primitive.
- Style components with colocated `styles.module.scss` files and existing global design tokens. Do not add Tailwind; it is not installed.
- Prefer Motion for interface animations. Use CSS animations or transitions only when Motion is not a reasonable fit.
- Render application images through the shared `Image` component, which wraps `next/image`.
- Do not add code comments.

### Imports

- Use the `@/*` alias for repository-root imports and relative imports for nearby files and styles.
- Import reusable components from their domain barrel files.
- Preserve the ESLint import ordering configured in [`eslint.config.mjs`](./eslint.config.mjs).

## Environment

- `AUTH_SECRET`: Auth.js signing secret
- `ADMIN_PASSWORD_HASH`: Argon2 hash for the admin password
