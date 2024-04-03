/*
  Warnings:

  - You are about to alter the column `used` on the `passwords` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "passwords" ALTER COLUMN "used" SET DATA TYPE INTEGER;
