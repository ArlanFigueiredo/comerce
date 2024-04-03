-- CreateTable
CREATE TABLE "recover_passwords" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "used" DECIMAL(65,30) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "recover_passwords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recover_passwords" ADD CONSTRAINT "recover_passwords_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
