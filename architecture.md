# AYCO Architecture

## Current Frontend Contract Audit

### Route map
- `/` base landing page
- `/zones`
- `/zones/[slug]`
- `/heat`
- `/steals`
- `/product/[id]`
- `/locker`
- `/claims`
- `/claims/[id]`
- `/vault`
- `/rewind`
- `/settings`
- `/stash`
- `/drop`
- `/drop/success`
- global Scout overlay from layout
- Receipts rendered inside PDP tabs

### Current mock-data dependencies
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/not-found.tsx`
- `apps/web/src/app/sitemap.ts`
- `apps/web/src/app/(shop)/zones/[slug]/page.tsx`
- `apps/web/src/app/(shop)/heat/page.tsx`
- `apps/web/src/app/(shop)/steals/page.tsx`
- `apps/web/src/app/(shop)/product/[id]/page.tsx`
- `apps/web/src/app/(shop)/product/[id]/opengraph-image.tsx`
- `apps/web/src/app/(locker)/locker/page.tsx`
- `apps/web/src/app/(locker)/claims/page.tsx`
- `apps/web/src/app/(locker)/claims/[id]/page.tsx`
- `apps/web/src/components/picks/CampusHeat.tsx`
- `apps/web/src/components/picks/SemesterPicks.tsx`
- `apps/web/src/components/product/ProductTabs.tsx`
- `apps/web/src/components/stash/StashView.tsx`
- `apps/web/src/hooks/useInfiniteProducts.ts`
- `apps/web/src/hooks/useScout.ts`
- `apps/web/src/hooks/useVault.ts`
- `apps/web/src/hooks/useRewind.ts`
- `apps/web/src/app/api/claims/route.ts`
- `apps/web/src/app/api/scout/route.ts`
- `apps/web/src/app/api/picks/route.ts`

### Current client-persisted durable state
- `apps/web/src/stores/stash.store.ts`
  durable domain state incorrectly stored in local persistence
- `apps/web/src/stores/vault.store.ts`
  durable domain state incorrectly stored in local persistence
- `apps/web/src/stores/rewind.store.ts`
  durable domain state incorrectly stored in local persistence
- `apps/web/src/stores/user.store.ts`
  backend profile/preferences projection incorrectly stored as source of truth
- `apps/web/src/stores/ui.store.ts`
  valid client-only UI state
- `apps/web/src/stores/scout.store.ts`
  acceptable transient query/recent-open-state store once results move server-side

### Current stubbed route handlers
- `apps/web/src/app/api/scout/route.ts`
  edge route doing in-memory product substring filtering
- `apps/web/src/app/api/stash/route.ts`
  echo-only stub
- `apps/web/src/app/api/claims/route.ts`
  mock list + fake create response
- `apps/web/src/app/api/picks/route.ts`
  mock heat payload
- `apps/web/src/app/api/webhooks/payment/route.ts`
  fake acknowledge only
- `apps/web/src/app/api/webhooks/dispatch/route.ts`
  fake acknowledge only

## Target System

### Monorepo
- `apps/web`
  current Next.js product contract and BFF compatibility layer
- `apps/api`
  NestJS + Fastify business backend
- `packages/db`
  Prisma schema, migrations, seed, generated client
- `packages/contracts`
  shared envelope types and Zod contracts
- `packages/config`
  shared tsconfig and workspace config

### Bounded contexts
- Auth
- Users
- Catalog
- Campuses
- Zones
- Products
- Product Variants
- Scout Search
- Picks / Heat / Steals
- Stash
- Vault
- Rewind
- Claims
- Payments
- Receipts
- Reactions
- Clout
- Dispatch / Tracking
- Notifications
- Analytics / Event Log
- Admin / Moderation

### Source-of-truth rules
- UI state stays in Zustand
- server state moves to React Query + backend
- durable domain state moves to PostgreSQL
- money, claim status, clout, inventory, and payment state are backend-authoritative only

## Phase plan

### Phase 1
- workspace scaffold
- NestJS service shell
- Prisma schema and initial migration
- shared contracts
- auth + users/preferences modules

### Phase 2
- catalog, zones, products, heat, steals, picks
- replace public mock reads

### Phase 3
- stash, vault, rewind, locker summary
- remove durable local-only persistence

### Phase 4
- claims, Stripe payment intents, webhook reconciliation

### Phase 5
- receipts, reactions, clout ledger, analytics

### Phase 6
- observability, security hardening, CI gates, BFF cleanup
