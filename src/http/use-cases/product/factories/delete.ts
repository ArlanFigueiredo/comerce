import { PrismaAdmRepository } from '@/http/repositories/adm/prisma-adm-repository'
import { PrismaProductRepository } from '@/http/repositories/product/prisma-product-repository'
import { DeleteProductUseCase } from '../delete'
export function factorieDeleteProduct() {
  const admRepository = new PrismaAdmRepository()
  const productRepository = new PrismaProductRepository()
  const deleteProductUseCase = new DeleteProductUseCase(
    admRepository,
    productRepository,
  )
  return deleteProductUseCase
}
