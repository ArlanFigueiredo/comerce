/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `adms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "adms_username_key" ON "adms"("username");
