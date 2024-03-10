import { AdmDoesNotExistsError } from '@/error/adm/admDoesNotExistsError'
import { ProducDoesNotExistsError } from '@/error/product/productDoesNotExistError'
import { AdmRepository } from '@/http/repositories/adm/adm-repository'
import { ProductRepository } from '@/http/repositories/product/product-repository'

interface DeleteProductUseCaseRequest {
  id: string
  adm_id: string
}

export class DeleteProductUseCase {
  constructor(
    private admRepository: AdmRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute({ id, adm_id }: DeleteProductUseCaseRequest): Promise<void> {
    const admExists = await this.admRepository.findById(adm_id)
    if (!admExists) {
      throw new AdmDoesNotExistsError()
    }
    const productExists = await this.productRepository.findProductAdm(
      id,
      adm_id,
    )
    if (!productExists) {
      throw new ProducDoesNotExistsError()
    }

    await this.productRepository.delete(id, adm_id)
  }
}
