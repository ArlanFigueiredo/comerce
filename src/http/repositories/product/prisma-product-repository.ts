import { Prisma, Product } from '@prisma/client'
import { ProductRepository } from './product-repository'
import { prisma } from '@/lib/prisma'

interface UpdateProduct {
  id: string
  name: string
  description: string
  link_img: string
  unit_price: number
}

export class PrismaProductRepository implements ProductRepository {
  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id,
      },
    })
  }

  async update({
    id,
    name,
    description,
    link_img,
    unit_price,
  }: UpdateProduct): Promise<Product | null> {
    const product = await prisma.product.update({
      data: {
        name,
        description,
        link_img,
        unit_price,
      },
      where: {
        id,
      },
    })
    return product
  }

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
