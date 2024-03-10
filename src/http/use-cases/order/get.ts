import { OrderRepository } from '@/http/repositories/order/order-repository'
import { Order } from '@prisma/client'

interface GetOrderUseCaseResponse {
  order: Order[] | null
}
export class GetOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<GetOrderUseCaseResponse> {
    const order = await this.orderRepository.findAllOrder()
    return {
      order,
    }
  }
}
