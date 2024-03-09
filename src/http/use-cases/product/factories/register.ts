import { PrismaProductRepository } from '@/http/repositories/product/prisma-product-repository'
import { RegisterProductUseCase } from '../register'
import { PrismaAdmRepository } from '@/http/repositories/adm/prisma-adm-repository'

export function registerProductFactorie() {
  const productRepository = new PrismaProductRepository()
  const admRepository = new PrismaAdmRepository()
  const registerProductUseCase = new RegisterProductUseCase(
    productRepository,
    admRepository,
  )
  return registerProductUseCase
}
