# Test Matrix

## Unit
- formatters
- validators
- clout calculations
- rewind grouping logic
- heat ranking logic
- claim transition helpers
- payment reconciliation helpers
- stash subtotal + variant merge logic

## Integration
- auth register/login/refresh/logout
- users me/preferences
- stash CRUD
- vault CRUD
- rewind tracking
- locker summary aggregation
- claim creation idempotency
- payment intent creation
- Stripe webhook replay safety
- receipt creation + reaction uniqueness
- Scout search relevance

## E2E
- landing page loads
- Scout opens and returns results
- zone page filters products
- PDP add-to-stash works
- stash quantity updates
- drop flow validates forms
- successful payment leads to persisted claim
- locker reflects vault/claim changes
- rewind records viewed PDPs
- settings persist
- unauthorized routes redirect or reject
