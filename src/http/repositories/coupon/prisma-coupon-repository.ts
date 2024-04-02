import { Coupon, Prisma } from '@prisma/client'
import { CouponRepository } from './coupon-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCouponRepository implements CouponRepository {
  async findById(id: string): Promise<Coupon | null> {
    const coupon = await prisma.coupon.findUnique({
      where: {
        id,
      },
    })
    return coupon
  }

  async findByName(name: string): Promise<Coupon | null> {
    const coupon = await prisma.coupon.findUnique({
      where: {
        name,
      },
    })
    return coupon
  }

  async create(data: Prisma.CouponCreateManyInput): Promise<Coupon> {
    const coupon = await prisma.coupon.create({
      data,
    })
    return coupon
  }
}
