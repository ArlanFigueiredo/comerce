import { ImgProdut, Prisma } from '@prisma/client'
import { UploadImgProductRepository } from './upload-img-product-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUploadImgProductRepository
  implements UploadImgProductRepository
{
  async create(data: Prisma.ImgProdutCreateManyInput): Promise<ImgProdut> {
    const img_product = await prisma.imgProdut.create({
      data,
    })
    return img_product
  }
}
