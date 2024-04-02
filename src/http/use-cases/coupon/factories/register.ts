import { PrismaCouponRepository } from '@/http/repositories/coupon/prisma-coupon-repository'
import { RegisterCouponUseCase } from '../register'

export function factorieRegisterCoupon() {
  const couponRepository = new PrismaCouponRepository()
  const registerCouponUseCase = new RegisterCouponUseCase(couponRepository)
  return registerCouponUseCase
}
