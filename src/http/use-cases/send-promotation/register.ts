import { EmailAlredyExistsError } from '@/error/send-promotation/emailAlredyExistError'
import { SendPromotationRepository } from '@/http/repositories/send-promotation/send-promotation-repository'
import { SendPromotation } from '@prisma/client'

interface RegisterSendPromotationlUseCaseRequest {
  userId?: string
  email: string
}
interface RegisterSendPromotationlUseCaseResponse {
  sendPromotation: SendPromotation
}

export class RegisterSendPromotationUseCase {
  constructor(private sendPromotationRepository: SendPromotationRepository) {}
  async execute({
    userId,
    email,
  }: RegisterSendPromotationlUseCaseRequest): Promise<RegisterSendPromotationlUseCaseResponse> {
    const findSendPromotation =
      await this.sendPromotationRepository.findByEmail(email)

    if (findSendPromotation) {
      throw new EmailAlredyExistsError()
    }

    const sendPromotation = await this.sendPromotationRepository.create({
      userId,
      email,
    })
    return {
      sendPromotation,
    }
  }
}
