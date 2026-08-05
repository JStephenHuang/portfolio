# portfolio rebuild

# nextjs-template

A scalable, conventional Next.js starter with sensible defaults and documented conventions.

## Stack

- **Framework:** Next.js (App Router) + React
- **Components:** Ark UI (`@ark-ui/react`) headless primitives
- **Styling:** TailwindCSS + SCSS
- **Forms:** React Hook Form + Zod (`zodResolver`)
- **Icons:** Phosphor
- **Tooling:** ESLint, Prettier, TypeScript

## Getting Started

Clone the repo, then name your project:

```bash
pnpm setup           # prompts for a project name
# or: pnpm setup "project name"
```

This renames the project, resets git history, and removes the setup script. Then:

```bash
pnpm install
pnpm dev
```

## Dump CMS

The password-protected editor at `/admin` stores drafts in the browser and publishes content to a GitHub pull request targeting `stephen/rebuild-3`. Configure these server-only environment variables:

```bash
AUTH_SECRET="a-long-random-secret"
ADMIN_PASSWORD_HASH="$argon2id$..."
GITHUB_CONTENT_TOKEN="github_pat_..."
```

Generate the password hash locally without committing the password or output to the repository:

```bash
node -e 'require("argon2").hash(process.argv[1], {type: require("argon2").argon2id}).then(console.log)' 'your password'
```

Create a fine-grained GitHub personal access token scoped only to `JStephenHuang/portfolio`, with read/write access to Contents and Pull Requests. Deployment-level rate limiting is recommended in addition to the editor's bounded process-local login throttle, particularly on multi-instance hosting.
