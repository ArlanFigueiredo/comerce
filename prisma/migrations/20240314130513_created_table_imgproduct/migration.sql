-- CreateTable
CREATE TABLE "img_products" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "link_file" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "img_products_pkey" PRIMARY KEY ("id")
);
