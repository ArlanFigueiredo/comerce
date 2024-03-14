import { ProductDoesNotExistsError } from '@/error/product/productDoesNotExistError'
import { ProductRepository } from '@/http/repositories/product/product-repository'
import { UploadImgProductRepository } from '@/http/repositories/upload-img-product/upload-img-product-repository'
import { ImgProdut } from '@prisma/client'

interface UploadImgProductRequest {
  product_id: string
  link_file: string
}
interface UploadImgProductResponse {
  img_product: ImgProdut
}
export class UploadImgProduct {
  constructor(
    private uploadImgProductRepository: UploadImgProductRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute({
    product_id,
    link_file,
  }: UploadImgProductRequest): Promise<UploadImgProductResponse> {
    const product = await this.productRepository.findById(product_id)
    if (!product) {
      throw new ProductDoesNotExistsError()
    }
    const img_product = await this.uploadImgProductRepository.create({
      product_id,
      link_file,
    })

    return {
      img_product,
    }
  }
}
