# AYCO API Spec Summary

Base URL:
- `http://localhost:4000/api/v1`

Envelope:

```json
{
  "success": true,
  "data": {},
  "error": {
    "code": "STRING_CODE",
    "message": "Human-readable message",
    "details": {}
  },
  "meta": {
    "requestId": "uuid",
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 42
    }
  }
}
```

## Endpoint families

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

### User profile and preferences
- `GET /users/me`
- `PATCH /users/preferences`

### Catalog
- `GET /catalog/products`
- `GET /catalog/products/:id`
- `GET /catalog/products/:id/related`
- `GET /catalog/zones`
- `GET /catalog/zones/:slug`
- `GET /catalog/heat`
- `GET /catalog/steals`

### Discovery
- `GET /scout/search`

### User state
- `GET /stash`
- `POST /stash/items`
- `PATCH /stash/items/:id`
- `DELETE /stash/items/:id`
- `GET /vault`
- `POST /vault`
- `DELETE /vault/:productId`
- `POST /vault/grab-all`
- `GET /rewind`

### Transactional
- `GET /claims`
- `POST /claims`
- `GET /claims/:id`
- `GET /claims/:id/tracking`
- `POST /payments/intents`

### Community
- `GET /receipts`
- `POST /receipts`
- `POST /receipts/:id/reactions`

### Dashboard
- `GET /locker/summary`

### Provider callbacks
- `POST /webhooks/stripe`

## Explicit error codes
- `AUTH_INVALID_CREDENTIALS`
- `AUTH_REFRESH_TOKEN_INVALID`
- `PRODUCT_NOT_FOUND`
- `ZONE_NOT_FOUND`
- `STASH_ITEM_INVALID_VARIANT`
- `CLAIM_NOT_FOUND`
- `CLAIM_PAYMENT_STATE_INVALID`
- `STRIPE_SIGNATURE_INVALID`
- `RECEIPT_RATE_LIMITED`
