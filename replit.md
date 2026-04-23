# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Documentation Site (`artifacts/docs`)
- **Framework**: VitePress 1.6.4
- **Preview path**: `/` (root)
- **Port**: 21121
- **Dev command**: `vitepress dev --port $PORT --host 0.0.0.0`
- **Build output**: `artifacts/docs/.vitepress/dist`
- **Theme**: Custom VitePress default theme with teal/cyan accent, Inter + JetBrains Mono fonts, dark-by-default support
- **Features**: Local search, dark/light mode, sidebar navigation, table of contents, code syntax highlighting
- **Docs structure**: `introduction/`, `chapter-1/`, `chapter-2/`, `chapter-3/` with placeholder .md files
- **Sidebar config**: `artifacts/docs/.vitepress/config.ts`
- **Custom styles**: `artifacts/docs/.vitepress/theme/style.css`

### API Server (`artifacts/api-server`)
- **Framework**: Express 5
- **Port**: 8080
- **Preview path**: `/api`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Adding Content to Docs

The sidebar is **auto-generated** from the file system — no config edits needed:
1. Replace or create `.md` files in `artifacts/docs/chapter-*/` or create new chapter folders
2. The sidebar reads H1 headings from each `.md` file automatically
3. Restart the dev server to pick up new files
4. See `artifacts/docs/introduction/how-to-add-content.md` for detailed instructions

**Folder ordering**: `introduction/` → `getting-started/` → `chapter-N/` (numeric) → others

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
