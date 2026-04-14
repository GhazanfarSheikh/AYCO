CREATE TYPE "ProductStatus" AS ENUM ('draft', 'active', 'archived');
CREATE TYPE "MediaType" AS ENUM ('image', 'video');

ALTER TABLE "Campus"
  ADD COLUMN "code" TEXT,
  ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE "Zone"
  ADD COLUMN "imageUrl" TEXT,
  ADD COLUMN "iconKey" TEXT,
  ADD COLUMN "accent" TEXT,
  ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE "Product" RENAME COLUMN "name" TO "title";
ALTER TABLE "Product" RENAME COLUMN "currentHeatScore" TO "heatScore";
ALTER TABLE "Product" RENAME COLUMN "currentHeatTier" TO "heatTier";

ALTER TABLE "Product"
  ALTER COLUMN "status" DROP DEFAULT,
  ALTER COLUMN "status" TYPE "ProductStatus"
  USING CASE
    WHEN "status" = 'draft' THEN 'draft'::"ProductStatus"
    WHEN "status" = 'archived' THEN 'archived'::"ProductStatus"
    ELSE 'active'::"ProductStatus"
  END,
  ALTER COLUMN "status" SET DEFAULT 'active';

ALTER TABLE "Product"
  ADD COLUMN "campusId" TEXT,
  ADD COLUMN "primaryZoneId" TEXT,
  ADD COLUMN "features" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "specs" JSONB,
  ADD COLUMN "searchKeywords" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "ratingCount" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN "isExamRelevant" BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN "dispatchDays" INTEGER;

UPDATE "Product"
SET "ratingCount" = "receiptCount";

ALTER TABLE "Product"
  ADD CONSTRAINT "Product_campusId_fkey"
  FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Product"
  ADD CONSTRAINT "Product_primaryZoneId_fkey"
  FOREIGN KEY ("primaryZoneId") REFERENCES "Zone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ProductMedia" RENAME COLUMN "kind" TO "type";
ALTER TABLE "ProductMedia" RENAME COLUMN "altText" TO "alt";

ALTER TABLE "ProductMedia"
  ALTER COLUMN "type" TYPE "MediaType"
  USING CASE
    WHEN "type" = 'video' THEN 'video'::"MediaType"
    ELSE 'image'::"MediaType"
  END;

ALTER TABLE "SemesterPick"
  ADD COLUMN "label" TEXT,
  ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE "Steal"
  ADD COLUMN "priority" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "badgeText" TEXT,
  ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT TRUE;

CREATE INDEX "Zone_isActive_sortOrder_idx" ON "Zone"("isActive", "sortOrder");
CREATE INDEX "Product_status_campusId_updatedAt_idx" ON "Product"("status", "campusId", "updatedAt");
CREATE INDEX "Product_primaryZoneId_status_idx" ON "Product"("primaryZoneId", "status");
CREATE INDEX "Product_heatScore_idx" ON "Product"("heatScore");
CREATE INDEX "Product_heatTier_idx" ON "Product"("heatTier");
CREATE INDEX "ProductZoneMap_zoneId_productId_idx" ON "ProductZoneMap"("zoneId", "productId");
CREATE INDEX "SemesterPick_isActive_rank_idx" ON "SemesterPick"("isActive", "rank");
CREATE INDEX "Steal_campusId_startsAt_endsAt_idx" ON "Steal"("campusId", "startsAt", "endsAt");
CREATE INDEX "Steal_productId_endsAt_idx" ON "Steal"("productId", "endsAt");
