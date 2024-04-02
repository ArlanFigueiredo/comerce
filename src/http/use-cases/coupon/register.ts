import { CouponAlredyExistsError } from '@/error/coupon/couponAlredyExistsError'
import { CouponRepository } from '@/http/repositories/coupon/coupon-repository'
import { Coupon } from '@prisma/client'

interface RegisterCouponUseCaseRequest {
  name: string
  discount_value: number
  discount_type: string
  active: boolean
}

interface RegisterCouponUseCaseResponse {
  coupon: Coupon
}

export class RegisterCouponUseCase {
  constructor(private couponRepository: CouponRepository) {}

  async execute({
    name,
    discount_value,
    discount_type,
    active,
  }: RegisterCouponUseCaseRequest): Promise<RegisterCouponUseCaseResponse> {
    const couponExist = await this.couponRepository.findByName(name)

    if (couponExist) {
      throw new CouponAlredyExistsError()
    }

    const coupon = await this.couponRepository.create({
      name,
      discount_value,
      discount_type,
      active,
    })

    return {
      coupon,
    }
  }
}
