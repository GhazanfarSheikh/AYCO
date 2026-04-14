# AYCO Platform

AYCO is a campus-commerce platform centered on student lifecycle concepts such as Scout, Heat, Steals, Zones, Locker, Claims, Vault, Rewind, Stash, Receipts, Clout, and Dispatch.

## Workspace layout
- `apps/web`
  existing Next.js frontend and compatibility surface
- `apps/api`
  NestJS + Fastify backend
- `packages/contracts`
  shared contracts and response envelopes
- `packages/db`
  Prisma schema, migrations, seed, generated client
- `packages/config`
  shared TypeScript config

## Local development

```bash
docker compose up -d
pnpm install
pnpm db:generate
pnpm --filter @ayco/db db:migrate:dev
pnpm dev:web
pnpm dev:api
```

## Docs
- `architecture.md`
- `domain-model.md`
- `api-spec.md`
- `migration-plan.md`
- `test-matrix.md`
- `implementation-report.md`
