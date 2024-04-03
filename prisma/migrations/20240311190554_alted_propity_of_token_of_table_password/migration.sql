/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `passwords` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "passwords_token_key" ON "passwords"("token");
