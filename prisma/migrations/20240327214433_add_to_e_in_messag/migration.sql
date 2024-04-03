/*
  Warnings:

  - You are about to drop the column `messag` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `message` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "messag",
ADD COLUMN     "message" TEXT NOT NULL;
