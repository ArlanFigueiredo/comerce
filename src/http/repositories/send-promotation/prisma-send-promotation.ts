import { Prisma, SendPromotation } from '@prisma/client'
import { SendPromotationRepository } from './send-promotation-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSendPromotationRepository
  implements SendPromotationRepository
{
  async findById(id: string): Promise<SendPromotation | null> {
    const sendPromotation = await prisma.sendPromotation.findUnique({
      where: {
        id,
      },
    })
    return sendPromotation
  }

  async findByEmail(email: string): Promise<SendPromotation | null> {
    const sendPromotation = await prisma.sendPromotation.findFirst({
      where: {
        email,
      },
    })
    return sendPromotation
  }

  async findAllSendPromotation(): Promise<SendPromotation[]> {
    const sendPromotations = await prisma.sendPromotation.findMany()
    return sendPromotations
  }

  async create(
    data: Prisma.SendPromotationCreateInput,
  ): Promise<SendPromotation> {
    const sendPromotation = await prisma.sendPromotation.create({
      data,
    })
    return sendPromotation
  }
}
