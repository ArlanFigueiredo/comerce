import { AdmDoesNotExistsError } from '@/error/adm/admDoesNotExistsError'
import { ProductAlredyExistError } from '@/error/product/productalredyexisterror'
import { AdmRepository } from '@/http/repositories/adm/adm-repository'
import { ProductRepository } from '@/http/repositories/product/product-repository'
import { Product } from '@prisma/client'

interface RegisterProductUseCaseResponse {
  product: Product
}

interface RegisterProductUseCaseRequest {
  name: string
  description: string
  link_img: string
  unit_price: number
  adm_id: string
}

export class RegisterProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private admRepository: AdmRepository,
  ) {}

  async execute({
    name,
    description,
    link_img,
    unit_price,
    adm_id,
  }: RegisterProductUseCaseRequest): Promise<RegisterProductUseCaseResponse> {
    const productExist = await this.productRepository.findProduct(
      name,
      description,
      link_img,
    )
    console.log(productExist)
    if (productExist) {
      throw new ProductAlredyExistError()
    }

    const admExists = await this.admRepository.findById(adm_id)

    if (!admExists) {
      throw new AdmDoesNotExistsError()
    }

    const product = await this.productRepository.create({
      name,
      description,
      link_img,
      unit_price,
      adm_id,
    })

    return {
      product,
    }
  }
}
