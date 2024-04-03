/*
  Warnings:

  - Added the required column `subtotal` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "coupon_id" TEXT,
ADD COLUMN     "discount_value_total" INTEGER DEFAULT 0,
ADD COLUMN     "subtotal" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discount_value" INTEGER NOT NULL,
    "discount_type" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coupons_name_key" ON "coupons"("name");
