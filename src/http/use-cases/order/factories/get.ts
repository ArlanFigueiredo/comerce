import { GetOrderUseCase } from '../get'
import { PrismaOrderRepository } from '@/http/repositories/order/prisma-order-repository'
export function factorieGetOrder() {
  const orderRepository = new PrismaOrderRepository()
  const getOrderUseCase = new GetOrderUseCase(orderRepository)
  return getOrderUseCase
}
