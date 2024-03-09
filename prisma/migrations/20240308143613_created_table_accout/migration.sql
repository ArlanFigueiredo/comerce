-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "type_account" TEXT NOT NULL,
    "type" BYTEA NOT NULL,
    "adm_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_adm_id_key" ON "accounts"("adm_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_user_id_key" ON "accounts"("user_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_adm_id_fkey" FOREIGN KEY ("adm_id") REFERENCES "adms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
