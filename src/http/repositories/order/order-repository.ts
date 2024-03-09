import { Order, Prisma } from '@prisma/client'

export interface OrderRepository {
  findByUser(user_id: string): Promise<Order | null>
  findById(id: string): Promise<Order | null>
  create(data: Prisma.OrderCreateManyInput): Promise<Order>
}
