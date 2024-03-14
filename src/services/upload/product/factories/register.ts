import { PrismaUploadImgProductRepository } from '@/http/repositories/upload-img-product/prisma-upload-img-product-repository'
import { PrismaProductRepository } from '@/http/repositories/product/prisma-product-repository'
import { UploadImgProduct } from '../register'

export function factorieUploadImgProduct() {
  const productRepository = new PrismaProductRepository()
  const uploadImgProductRepository = new PrismaUploadImgProductRepository()
  const uploadImgProduct = new UploadImgProduct(
    uploadImgProductRepository,
    productRepository,
  )
  return uploadImgProduct
}
