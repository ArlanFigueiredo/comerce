import { PrismaAdmRepository } from '@/http/repositories/adm/prisma-adm-repository'
import { PrismaProductRepository } from '@/http/repositories/product/prisma-product-repository'
import { UpdateProductUseCase } from '../update'

export function factorieUpdateProduct() {
  const admRepository = new PrismaAdmRepository()
  const productRepository = new PrismaProductRepository()
  const updateProductUseCase = new UpdateProductUseCase(
    productRepository,
    admRepository,
  )
  return updateProductUseCase
}
