import { PrismaSendPromotationRepository } from '@/http/repositories/send-promotation/prisma-send-promotation'
import { RegisterSendPromotationUseCase } from '../register'

export function factoriesSendPromotationRegister() {
  const sendPromotationRepository = new PrismaSendPromotationRepository()
  const registerSendPromotationUseCase = new RegisterSendPromotationUseCase(
    sendPromotationRepository,
  )

  return registerSendPromotationUseCase
}
