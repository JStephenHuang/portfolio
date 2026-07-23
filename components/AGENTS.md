# components overview

Reusable React components, grouped by domain.

- `ui/` holds presentational primitives;
- `form/` holds form-field components wired for React Hook Form.
- `primitives/` holds headless components (e.g. Ark UI) vendored and given styles via a `styles.module.scss`.

## Structure

- One component per folder: `ComponentName/index.tsx` + `ComponentName/styles.module.scss`
- Each domain folder has a barrel `index.ts` re-exporting its components
- Import from the barrel, not the file: `import { Button } from "@/components/ui"`
- Components with multiple variants are exported as a namespace and used as a compound component (`export * as Button from "./Button"` → `<Button.Primary>`, `<Button.Action dark>`)

## Convention

- Use global variables as much as possilbe
- Use arrow function with `:React.FC<Props>` for better visibility
