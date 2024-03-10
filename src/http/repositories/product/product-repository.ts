import { Prisma, Product } from '@prisma/client'

interface UpdateProduct {
  id: string
  name: string
  description: string
  link_img: string
  unit_price: number
}

export interface ProductRepository {
  findProduct(
    name: string,
    description: string,
    link_img: string,
  ): Promise<Product | null>
  findAllProducts(): Promise<Product[] | null>
  findById(id: string): Promise<Product | null>
  create(data: Prisma.ProductCreateManyInput): Promise<Product>
  update({
    id,
    name,
    description,
    link_img,
    unit_price,
  }: UpdateProduct): Promise<Product | null>
  delete(id: string): Promise<void>
}
