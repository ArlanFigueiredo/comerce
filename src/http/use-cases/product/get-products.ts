import { ProductRepository } from '@/http/repositories/product/product-repository'
import { Product } from '@prisma/client'

interface GetProductsUseCaseResponse {
  products: Product[] | null
}

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<GetProductsUseCaseResponse> {
    const products = await this.productRepository.findAllProducts()
    return {
      products,
    }
  }
}
