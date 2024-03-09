import { Prisma, Product } from '@prisma/client'

export interface ProductRepository {
  findProduct(
    name: string,
    description: string,
    link_img: string,
  ): Promise<Product | null>
  findAllProducts(): Promise<Product[] | null>
  findById(id: string): Promise<Product | null>
  create(data: Prisma.ProductCreateManyInput): Promise<Product>
}
