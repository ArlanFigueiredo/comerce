import { ContactRepository } from '@/http/repositories/contact/contact-repository'
import { Contact } from '@prisma/client'

interface RegisterContactUseCaseRequest {
  name: string
  lastName: string
  email: string
  message: string
}

interface RegisterContactUseCaseResponse {
  contact: Contact
}

export class RegisterContactUseCase {
  constructor(private contactRepository: ContactRepository) {}

  async execute({
    name,
    lastName,
    email,
    message,
  }: RegisterContactUseCaseRequest): Promise<RegisterContactUseCaseResponse> {
    const contact = await this.contactRepository.create({
      name,
      lastName,
      email,
      message,
    })

    return {
      contact,
    }
  }
}
