import { Order, Prisma } from '@prisma/client'
import { OrderRepository } from './order-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrderRepository implements OrderRepository {
  async findByUser(user_id: string): Promise<Order | null> {
    const order = await prisma.order.findFirst({
      where: {
        user_id,
      },
    })
    return order
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    })
    return order
  }

  async create(data: Prisma.OrderCreateManyInput): Promise<Order> {
    const order = await prisma.order.create({
      data,
    })
    return order
  }
}
