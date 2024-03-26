import { AdmDoesNotExistsError } from '@/error/adm/admDoesNotExistsError'
import { ProductDoesNotExistsError } from '@/error/product/productDoesNotExistError'
import { ProductAlredyExistError } from '@/error/product/productalredyexisterror'
import { AdmRepository } from '@/http/repositories/adm/adm-repository'
import { ProductRepository } from '@/http/repositories/product/product-repository'
import { Product } from '@prisma/client'

interface UpdateProductUseCaseResponse {
  product: Product | null
}

interface UpdateProductUseCaseRequest {
  id: string
  adm_id: string
  name: string
  description: string
  link_img: string
  unit_price: number
}

export class UpdateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private admRepository: AdmRepository,
  ) {}

  async execute({
    id,
    adm_id,
    name,
    description,
    link_img,
    unit_price,
  }: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {
    const admExists = await this.admRepository.findById(adm_id)

    if (!admExists) {
      throw new AdmDoesNotExistsError()
    }

    const productExists = await this.productRepository.findProductAdm(
      id,
      adm_id,
    )

    const findProduct = await this.productRepository.findProduct(
      name,
      description,
      link_img,
    )

    if (findProduct) {
      throw new ProductAlredyExistError()
    }

    if (!productExists) {
      throw new ProductDoesNotExistsError()
    }

    const product = await this.productRepository.update({
      id,
      adm_id,
      name,
      description,
      link_img,
      unit_price,
    })

    return {
      product,
    }
  }
}
