# Mock-to-Real Migration Plan

## Current fake persistence to replace
- `apps/web/src/lib/mock-data.ts`
- `apps/web/src/stores/stash.store.ts`
- `apps/web/src/stores/vault.store.ts`
- `apps/web/src/stores/rewind.store.ts`
- `apps/web/src/stores/user.store.ts`
- `apps/web/src/app/api/*` stubs

## Compatibility strategy

### Step 1
- keep existing route paths and component boundaries
- move backend business logic into `apps/api`
- keep Next route handlers only as thin compatibility proxies if needed

### Step 2
- introduce shared query hooks per domain
- transition read paths first:
  - zones
  - heat
  - steals
  - product detail
  - locker summary

### Step 3
- transition durable user state:
  - stash
  - vault
  - rewind
  - preferences
- keep optimistic UI in Zustand but reconcile against backend truth

### Step 4
- transition claim creation and payment flow
- deprecate fake success states
- gate claim completion on backend-verified Stripe state

### Step 5
- replace receipt and reaction mock/community flows
- enable moderation and rate limiting

### Step 6
- delete or proxy-retire legacy Next route handlers
- remove production `mock-data` dependencies from live routes
