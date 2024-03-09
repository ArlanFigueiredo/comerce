import { PrismaOrderRepository } from '@/http/repositories/order/prisma-order-repository'
import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { RegisterOrderUseCase } from '../register'
import { PrismaProductRepository } from '@/http/repositories/product/prisma-product-repository'

export function factorieRegisterOrder() {
  const orderRepositoruy = new PrismaOrderRepository()
  const userRepository = new PrismaUserRepository()
  const productRepository = new PrismaProductRepository()
  const registerOrderUseCase = new RegisterOrderUseCase(
    orderRepositoruy,
    productRepository,
    userRepository,
  )
  return registerOrderUseCase
}
