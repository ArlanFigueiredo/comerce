/*
  Warnings:

  - You are about to drop the `env_promotations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "env_promotations";

-- CreateTable
CREATE TABLE "send_promotations" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "send_promotations_pkey" PRIMARY KEY ("id")
);
