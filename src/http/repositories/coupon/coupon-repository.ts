import { Coupon, Prisma } from '@prisma/client'

export interface CouponRepository {
  findById(id: string): Promise<Coupon | null>
  findByName(name: string): Promise<Coupon | null>
  create(data: Prisma.CouponCreateManyInput): Promise<Coupon>
}
