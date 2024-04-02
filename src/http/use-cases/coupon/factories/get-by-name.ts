import { PrismaCouponRepository } from '@/http/repositories/coupon/prisma-coupon-repository'
import { GetByNameUseCase } from '../get-by-name'

export function factorieGetByName() {
  const couponRepository = new PrismaCouponRepository()
  const getByNameUseCase = new GetByNameUseCase(couponRepository)
  return getByNameUseCase
}
