import { ImgProdut, Prisma } from '@prisma/client'

export interface UploadImgProductRepository {
  create(data: Prisma.ImgProdutCreateManyInput): Promise<ImgProdut>
}
