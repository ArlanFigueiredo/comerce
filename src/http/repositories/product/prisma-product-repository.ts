import { Prisma, Product } from '@prisma/client'
import { ProductRepository } from './product-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProductRepository implements ProductRepository {
  async findProduct(
    name: string,
    description: string,
    link_img: string,
  ): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        name,
        description,
        link_img,
      },
    })
    return product
  }

  async findAllProducts(): Promise<Product[] | null> {
    const products = await prisma.product.findMany()
    return products
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })
    return product
  }

  async create(data: Prisma.ProductCreateManyInput): Promise<Product> {
    const product = await prisma.product.create({
      data,
    })
    return product
  }
}
