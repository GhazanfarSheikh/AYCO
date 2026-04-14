# Implementation Report

## What changed
- moved the current Next.js product into `apps/web`
- introduced workspace orchestration at the repo root
- added shared config and contracts packages
- added `packages/db` with a normalized Prisma schema, initial migration, and seed
- scaffolded `apps/api` as a NestJS + Fastify service with:
  - request IDs
  - domain exception filter
  - Zod validation pipe
  - Prisma integration point
  - auth module shell
  - users/preferences module shell
- added OpenAPI baseline, env examples, Docker Compose, migration plan, and test matrix

## What remains feature-flagged or scaffolded
- catalog/heat/steals/picks backend modules
- stash/vault/rewind backend modules
- claims/payment/write-path migration
- receipts/reactions/clout/analytics modules
- real Stripe reconciliation wiring
- observability exporters and Sentry bootstrap

## Known risks
- backend dependencies are newly declared and need workspace install before api verification
- Prisma migration SQL is authored to match the schema baseline but still needs execution against a live PostgreSQL container
- existing `apps/web` still reads mock data on production paths until Phases 2–5 replace them
- `apps/web/src/app/api/*` compatibility routes are still stubs and should be replaced or proxied in later phases

## Next recommended improvements
- install workspace dependencies and generate Prisma client
- verify `apps/web` builds from the new workspace layout
- execute Prisma migration against local Postgres
- wire `users/me` and `users/preferences` from `apps/web` to `apps/api`
- implement catalog read modules next so public pages can stop depending on `mock-data`
