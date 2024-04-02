import { ProductDoesNotExistsError } from '@/error/product/productDoesNotExistError'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { OrderRepository } from '@/http/repositories/order/order-repository'
import { ProductRepository } from '@/http/repositories/product/product-repository'
import { UserRepository } from '@/http/repositories/user/user-repository'
import { Order, Product, User } from '@prisma/client'

interface RegisterOrderUseCaseResponse {
  order: Order
  user: User
  product: Product
}

interface RegisterOrderUseCaseRequest {
  quantity_product: number
  total_price: number
  subtotal: number
  discount_value_total?: number
  product_id: string
  user_id: string
  coupon_id?: string
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
    subtotal,
    discount_value_total,
    product_id,
    user_id,
    coupon_id,
  }: RegisterOrderUseCaseRequest): Promise<RegisterOrderUseCaseResponse> {
    const user = await this.userRepository.findById(user_id)
    if (!user) {
      throw new UserDoesNotExistError()
    }

    const product = await this.productRepository.findById(product_id)

    if (!product) {
      throw new ProductDoesNotExistsError()
    }

    const order = await this.orderRepository.create({
      quantity_product,
      total_price,
      subtotal,
      discount_value_total,
      product_id,
      user_id,
      coupon_id,
    })
    return {
      order,
      user,
      product,
    }
  }
}
