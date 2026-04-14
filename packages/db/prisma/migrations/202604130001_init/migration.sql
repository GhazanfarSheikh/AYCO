-- AYCO platform initial schema
-- Generated manually to align with packages/db/prisma/schema.prisma

CREATE TYPE "Role" AS ENUM ('student', 'admin', 'moderator');
CREATE TYPE "ThemeMode" AS ENUM ('dark', 'light', 'system');
CREATE TYPE "ClaimStatus" AS ENUM ('draft', 'pending_payment', 'paid', 'processing', 'dispatched', 'delivered', 'cancelled', 'refunded', 'failed');
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'requires_action', 'succeeded', 'failed', 'cancelled', 'refunded');
CREATE TYPE "DispatchStatus" AS ENUM ('processing', 'dispatched', 'en_route', 'delivered', 'bounced', 'pulled');
CREATE TYPE "HeatTier" AS ENUM ('cold', 'warming', 'heating', 'blazing');
CREATE TYPE "ReactionType" AS ENUM ('thumbs_up', 'fire', 'skull', 'heart_eyes', 'thinking', 'money');
CREATE TYPE "ReceiptStatus" AS ENUM ('pending', 'published', 'rejected');

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'student',
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Campus" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "city" TEXT,
  "region" TEXT,
  "country" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "UserPreference" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "campusId" TEXT,
  "theme" "ThemeMode" NOT NULL DEFAULT 'system',
  "density" TEXT NOT NULL DEFAULT 'default',
  "examMode" BOOLEAN NOT NULL DEFAULT FALSE,
  "claimUpdates" BOOLEAN NOT NULL DEFAULT TRUE,
  "stealsAlerts" BOOLEAN NOT NULL DEFAULT TRUE,
  "heatAlerts" BOOLEAN NOT NULL DEFAULT FALSE,
  "receiptResponses" BOOLEAN NOT NULL DEFAULT TRUE,
  "marketing" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
  CONSTRAINT "UserPreference_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus" ("id") ON DELETE SET NULL
);

CREATE TABLE "RefreshToken" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "revokedAt" TIMESTAMP(3),
  "userAgent" TEXT,
  "ipAddress" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE
);

CREATE INDEX "RefreshToken_userId_revokedAt_idx" ON "RefreshToken" ("userId", "revokedAt");

CREATE TABLE "Zone" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Product" (
  "id" TEXT PRIMARY KEY,
  "slug" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "subtitle" TEXT,
  "description" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'active',
  "currentHeatScore" INTEGER NOT NULL DEFAULT 0,
  "currentHeatTier" "HeatTier" NOT NULL DEFAULT 'cold',
  "ratingAverage" DECIMAL(3,2),
  "receiptCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "Product_slug_idx" ON "Product" ("slug");
CREATE INDEX "Product_currentHeatScore_idx" ON "Product" ("currentHeatScore");
CREATE INDEX "Product_currentHeatTier_idx" ON "Product" ("currentHeatTier");

CREATE TABLE "ProductMedia" (
  "id" TEXT PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "altText" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProductMedia_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE
);

CREATE INDEX "ProductMedia_productId_sortOrder_idx" ON "ProductMedia" ("productId", "sortOrder");

CREATE TABLE "ProductVariant" (
  "id" TEXT PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "sku" TEXT NOT NULL UNIQUE,
  "slug" TEXT,
  "name" TEXT NOT NULL,
  "color" TEXT,
  "size" TEXT,
  "isDefault" BOOLEAN NOT NULL DEFAULT FALSE,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE
);

CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant" ("productId");

CREATE TABLE "Inventory" (
  "id" TEXT PRIMARY KEY,
  "productVariantId" TEXT NOT NULL UNIQUE,
  "quantityOnHand" INTEGER NOT NULL,
  "quantityReserved" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Inventory_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant" ("id") ON DELETE CASCADE
);

CREATE TABLE "ProductPrice" (
  "id" TEXT PRIMARY KEY,
  "productVariantId" TEXT NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "amount" DECIMAL(10,2) NOT NULL,
  "compareAtAmount" DECIMAL(10,2),
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "startsAt" TIMESTAMP(3),
  "endsAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProductPrice_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant" ("id") ON DELETE CASCADE
);

CREATE INDEX "ProductPrice_productVariantId_isActive_idx" ON "ProductPrice" ("productVariantId", "isActive");

CREATE TABLE "ProductTag" (
  "id" TEXT PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE
);

CREATE INDEX "ProductTag_label_idx" ON "ProductTag" ("label");

CREATE TABLE "ProductZoneMap" (
  "id" TEXT PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "zoneId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProductZoneMap_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE,
  CONSTRAINT "ProductZoneMap_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone" ("id") ON DELETE CASCADE,
  CONSTRAINT "ProductZoneMap_productId_zoneId_key" UNIQUE ("productId", "zoneId")
);

CREATE INDEX "ProductZoneMap_zoneId_sortOrder_idx" ON "ProductZoneMap" ("zoneId", "sortOrder");

CREATE TABLE "ProductHeatSnapshot" (
  "id" TEXT PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "campusId" TEXT,
  "score" INTEGER NOT NULL,
  "tier" "HeatTier" NOT NULL,
  "grabbedCount" INTEGER NOT NULL DEFAULT 0,
  "vaultedCount" INTEGER NOT NULL DEFAULT 0,
  "receiptCount" INTEGER NOT NULL DEFAULT 0,
  "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProductHeatSnapshot_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE,
  CONSTRAINT "ProductHeatSnapshot_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus" ("id") ON DELETE SET NULL
);

CREATE INDEX "ProductHeatSnapshot_productId_capturedAt_idx" ON "ProductHeatSnapshot" ("productId", "capturedAt");
CREATE INDEX "ProductHeatSnapshot_campusId_capturedAt_idx" ON "ProductHeatSnapshot" ("campusId", "capturedAt");
CREATE INDEX "ProductHeatSnapshot_score_tier_idx" ON "ProductHeatSnapshot" ("score", "tier");

CREATE TABLE "SemesterPick" (
  "id" TEXT PRIMARY KEY,
  "campusId" TEXT,
  "zoneId" TEXT,
  "productId" TEXT NOT NULL,
  "semesterKey" TEXT NOT NULL,
  "rank" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SemesterPick_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus" ("id") ON DELETE SET NULL,
  CONSTRAINT "SemesterPick_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone" ("id") ON DELETE SET NULL,
  CONSTRAINT "SemesterPick_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE
);

CREATE INDEX "SemesterPick_semesterKey_rank_idx" ON "SemesterPick" ("semesterKey", "rank");

CREATE TABLE "Steal" (
  "id" TEXT PRIMARY KEY,
  "productId" TEXT NOT NULL,
  "campusId" TEXT,
  "startsAt" TIMESTAMP(3) NOT NULL,
  "endsAt" TIMESTAMP(3) NOT NULL,
  "stealPrice" DECIMAL(10,2) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Steal_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE,
  CONSTRAINT "Steal_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus" ("id") ON DELETE SET NULL
);

CREATE INDEX "Steal_startsAt_endsAt_idx" ON "Steal" ("startsAt", "endsAt");
CREATE INDEX "Steal_campusId_endsAt_idx" ON "Steal" ("campusId", "endsAt");

CREATE TABLE "Stash" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Stash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE
);

CREATE TABLE "StashItem" (
  "id" TEXT PRIMARY KEY,
  "stashId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "productVariantId" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "StashItem_stashId_fkey" FOREIGN KEY ("stashId") REFERENCES "Stash" ("id") ON DELETE CASCADE,
  CONSTRAINT "StashItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
  CONSTRAINT "StashItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant" ("id") ON DELETE RESTRICT,
  CONSTRAINT "StashItem_userId_productVariantId_key" UNIQUE ("userId", "productVariantId")
);

CREATE INDEX "StashItem_stashId_idx" ON "StashItem" ("stashId");
CREATE INDEX "StashItem_userId_idx" ON "StashItem" ("userId");

CREATE TABLE "VaultItem" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "VaultItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
  CONSTRAINT "VaultItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE,
  CONSTRAINT "VaultItem_userId_productId_key" UNIQUE ("userId", "productId")
);

CREATE INDEX "VaultItem_userId_idx" ON "VaultItem" ("userId");

CREATE TABLE "RewindItem" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "lastViewedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RewindItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
  CONSTRAINT "RewindItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE,
  CONSTRAINT "RewindItem_userId_productId_key" UNIQUE ("userId", "productId")
);

CREATE INDEX "RewindItem_userId_lastViewedAt_idx" ON "RewindItem" ("userId", "lastViewedAt");

CREATE TABLE "Claim" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "claimNumber" TEXT NOT NULL UNIQUE,
  "status" "ClaimStatus" NOT NULL DEFAULT 'draft',
  "dispatchStatus" "DispatchStatus" NOT NULL DEFAULT 'processing',
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "subtotalAmount" DECIMAL(10,2) NOT NULL,
  "discountAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "dispatchAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "totalAmount" DECIMAL(10,2) NOT NULL,
  "addressSnapshot" JSONB NOT NULL,
  "paymentMethod" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Claim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT
);

CREATE INDEX "Claim_userId_status_createdAt_idx" ON "Claim" ("userId", "status", "createdAt");

CREATE TABLE "ClaimItem" (
  "id" TEXT PRIMARY KEY,
  "claimId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "productVariantId" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "unitAmount" DECIMAL(10,2) NOT NULL,
  "totalAmount" DECIMAL(10,2) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ClaimItem_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim" ("id") ON DELETE CASCADE,
  CONSTRAINT "ClaimItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT,
  CONSTRAINT "ClaimItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant" ("id") ON DELETE RESTRICT
);

CREATE INDEX "ClaimItem_claimId_idx" ON "ClaimItem" ("claimId");

CREATE TABLE "ClaimTrackingEvent" (
  "id" TEXT PRIMARY KEY,
  "claimId" TEXT NOT NULL,
  "dispatchStatus" "DispatchStatus" NOT NULL,
  "description" TEXT NOT NULL,
  "occurredAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ClaimTrackingEvent_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim" ("id") ON DELETE CASCADE
);

CREATE INDEX "ClaimTrackingEvent_claimId_occurredAt_idx" ON "ClaimTrackingEvent" ("claimId", "occurredAt");

CREATE TABLE "IdempotencyKey" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT,
  "scope" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "requestHash" TEXT NOT NULL,
  "responseBody" JSONB,
  "statusCode" INTEGER,
  "expiresAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "IdempotencyKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL,
  CONSTRAINT "IdempotencyKey_scope_key_key" UNIQUE ("scope", "key")
);

CREATE INDEX "IdempotencyKey_userId_scope_idx" ON "IdempotencyKey" ("userId", "scope");

CREATE TABLE "PaymentIntent" (
  "id" TEXT PRIMARY KEY,
  "claimId" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerReference" TEXT NOT NULL UNIQUE,
  "amount" DECIMAL(10,2) NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
  "idempotencyKeyId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PaymentIntent_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim" ("id") ON DELETE CASCADE,
  CONSTRAINT "PaymentIntent_idempotencyKeyId_fkey" FOREIGN KEY ("idempotencyKeyId") REFERENCES "IdempotencyKey" ("id") ON DELETE SET NULL
);

CREATE INDEX "PaymentIntent_claimId_idx" ON "PaymentIntent" ("claimId");
CREATE INDEX "PaymentIntent_providerReference_idx" ON "PaymentIntent" ("providerReference");

CREATE TABLE "PaymentAttempt" (
  "id" TEXT PRIMARY KEY,
  "claimId" TEXT NOT NULL,
  "paymentIntentId" TEXT,
  "provider" TEXT NOT NULL,
  "providerReference" TEXT,
  "amount" DECIMAL(10,2) NOT NULL,
  "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
  "failureCode" TEXT,
  "failureMessage" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PaymentAttempt_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim" ("id") ON DELETE CASCADE,
  CONSTRAINT "PaymentAttempt_paymentIntentId_fkey" FOREIGN KEY ("paymentIntentId") REFERENCES "PaymentIntent" ("id") ON DELETE SET NULL
);

CREATE INDEX "PaymentAttempt_claimId_idx" ON "PaymentAttempt" ("claimId");
CREATE INDEX "PaymentAttempt_providerReference_idx" ON "PaymentAttempt" ("providerReference");

CREATE TABLE "WebhookEvent" (
  "id" TEXT PRIMARY KEY,
  "provider" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "eventType" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "processedAt" TIMESTAMP(3),
  "processingError" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WebhookEvent_provider_eventId_key" UNIQUE ("provider", "eventId")
);

CREATE INDEX "WebhookEvent_provider_eventType_idx" ON "WebhookEvent" ("provider", "eventType");

CREATE TABLE "Receipt" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "status" "ReceiptStatus" NOT NULL DEFAULT 'pending',
  "rating" INTEGER NOT NULL,
  "body" TEXT NOT NULL,
  "mediaUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "moderationNotes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Receipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
  CONSTRAINT "Receipt_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE
);

CREATE INDEX "Receipt_productId_createdAt_idx" ON "Receipt" ("productId", "createdAt");
CREATE INDEX "Receipt_userId_createdAt_idx" ON "Receipt" ("userId", "createdAt");

CREATE TABLE "ReceiptReaction" (
  "id" TEXT PRIMARY KEY,
  "receiptId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "reactionType" "ReactionType" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReceiptReaction_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt" ("id") ON DELETE CASCADE,
  CONSTRAINT "ReceiptReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
  CONSTRAINT "ReceiptReaction_receiptId_userId_reactionType_key" UNIQUE ("receiptId", "userId", "reactionType")
);

CREATE INDEX "ReceiptReaction_receiptId_idx" ON "ReceiptReaction" ("receiptId");

CREATE TABLE "CloutLedgerEntry" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "delta" INTEGER NOT NULL,
  "reason" TEXT NOT NULL,
  "referenceId" TEXT,
  "referenceType" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CloutLedgerEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE
);

CREATE INDEX "CloutLedgerEntry_userId_createdAt_idx" ON "CloutLedgerEntry" ("userId", "createdAt");

CREATE TABLE "SearchLog" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT,
  "campusId" TEXT,
  "query" TEXT NOT NULL,
  "resultCount" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SearchLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL,
  CONSTRAINT "SearchLog_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus" ("id") ON DELETE SET NULL
);

CREATE INDEX "SearchLog_query_idx" ON "SearchLog" ("query");
CREATE INDEX "SearchLog_campusId_createdAt_idx" ON "SearchLog" ("campusId", "createdAt");

CREATE TABLE "AnalyticsEvent" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT,
  "campusId" TEXT,
  "eventName" TEXT NOT NULL,
  "payload" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AnalyticsEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL,
  CONSTRAINT "AnalyticsEvent_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus" ("id") ON DELETE SET NULL
);

CREATE INDEX "AnalyticsEvent_eventName_createdAt_idx" ON "AnalyticsEvent" ("eventName", "createdAt");

CREATE TABLE "AuditLog" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT,
  "action" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT,
  "payload" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL
);

CREATE INDEX "AuditLog_entityType_entityId_createdAt_idx" ON "AuditLog" ("entityType", "entityId", "createdAt");
