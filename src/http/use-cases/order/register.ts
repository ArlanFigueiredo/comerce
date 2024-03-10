import { ProducDoesNotExistsError } from '@/error/product/productDoesNotExistError'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { OrderRepository } from '@/http/repositories/order/order-repository'
import { ProductRepository } from '@/http/repositories/product/product-repository'
import { UserRepository } from '@/http/repositories/user/user-repository'
import { Order } from '@prisma/client'

interface RegisterOrderUseCaseResponse {
  order: Order
}

interface RegisterOrderUseCaseRequest {
  quantity_product: number
  total_price: number
  product_id: string
  user_id: string
}

export class RegisterOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    quantity_product,
    total_price,
    product_id,
    user_id,
  }: RegisterOrderUseCaseRequest): Promise<RegisterOrderUseCaseResponse> {
    const userExists = await this.userRepository.findById(user_id)
    if (!userExists) {
      throw new UserDoesNotExistError()
    }

    const productExists = await this.productRepository.findById(product_id)

    if (!productExists) {
      throw new ProducDoesNotExistsError()
    }

    const order = await this.orderRepository.create({
      quantity_product,
      total_price,
      product_id,
      user_id,
    })
    return {
      order,
    }
  }
}
