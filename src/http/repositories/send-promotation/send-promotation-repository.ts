import { Prisma, SendPromotation } from '@prisma/client'

export interface SendPromotationRepository {
  findById(id: string): Promise<SendPromotation | null>
  findByEmail(email: string): Promise<SendPromotation | null>
  findAllSendPromotation(): Promise<SendPromotation[]>
  create(data: Prisma.SendPromotationCreateInput): Promise<SendPromotation>
}
