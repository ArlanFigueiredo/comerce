import { PrismaProductRepository } from '@/http/repositories/product/prisma-product-repository'
import { GetProductsUseCase } from '../get-products'

export function factorieGetProducts() {
  const productRepository = new PrismaProductRepository()
  const getProductUseCase = new GetProductsUseCase(productRepository)
  return getProductUseCase
}
