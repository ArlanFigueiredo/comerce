import { CouponDoesNotExistsError } from '@/error/coupon/couponDoesNotExistError'
import { CouponRepository } from '@/http/repositories/coupon/coupon-repository'
import { Coupon } from '@prisma/client'

interface GetByNameUseCaseRequest {
  name: string
}

interface GetByNameUseCaseResponse {
  coupon: Coupon | null
}

export class GetByNameUseCase {
  constructor(private couponRepository: CouponRepository) {}

  async execute({
    name,
  }: GetByNameUseCaseRequest): Promise<GetByNameUseCaseResponse> {
    const coupon = await this.couponRepository.findByName(name)
    if (!coupon) {
      throw new CouponDoesNotExistsError()
    }
    return {
      coupon,
    }
  }
}
