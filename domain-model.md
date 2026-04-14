# AYCO Domain Model

## Identity and access
- `users`
  platform identities with role and lifecycle state
- `user_preferences`
  campus, theme, density, exam mode, Ping settings
- `refresh_tokens`
  revocable rotating session store

## Catalog
- `campuses`
  campus-aware ranking and personalization anchor
- `zones`
  AYCO browse taxonomy
- `products`
  canonical product record with current heat projection
- `product_media`
  image/video assets
- `product_variants`
  purchasable color/size/SKU records
- `inventory`
  authoritative stock state
- `product_prices`
  monetary source of truth
- `product_tags`
  Scout and merchandising search facets
- `product_zone_map`
  many-to-many product placement

## Discovery and ranking
- `product_heat_snapshots`
  historic heat score persistence
- `semester_picks`
  semester/campus/zone-aware picks
- `steals`
  time-window price overrides
- `search_logs`
  Scout telemetry and relevance feedback

## User state
- `stash`
  one staging container per user
- `stash_items`
  unique by user + variant
- `vault_items`
  unique by user + product
- `rewind_items`
  unique by user + product with rolling `last_viewed_at`

## Transactional core
- `claims`
  transactional purchase aggregate with human-readable claim number
- `claim_items`
  immutable item snapshot at purchase time
- `claim_tracking_events`
  operational dispatch timeline
- `payment_intents`
  backend-authoritative Stripe payment intent record
- `payment_attempts`
  attempt/retry history
- `webhook_events`
  idempotent provider event audit
- `idempotency_keys`
  duplication protection for sensitive writes

## Community and engagement
- `receipts`
  moderation-ready user-generated product content
- `receipt_reactions`
  unique per receipt/user/reaction
- `clout_ledger`
  append-only reward history
- `analytics_events`
  product and lifecycle telemetry

## Platform and audit
- `audit_logs`
  privileged or critical action audit trail

## Status model notes

### Claim lifecycle
- `draft`
- `pending_payment`
- `paid`
- `processing`
- `dispatched`
- `delivered`
- `cancelled`
- `refunded`
- `failed`

### Dispatch projection
- `processing`
- `dispatched`
- `en_route`
- `delivered`
- `bounced`
- `pulled`

### Receipt lifecycle
- `pending`
- `published`
- `rejected`
