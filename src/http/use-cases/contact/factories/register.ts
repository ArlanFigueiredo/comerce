import { PrismaContactRepository } from '@/http/repositories/contact/prisma-contact-repository'
import { RegisterContactUseCase } from '../register'

export function factorieRegisterContact() {
  const contactRepository = new PrismaContactRepository()
  const registerContactUseCase = new RegisterContactUseCase(contactRepository)
  return registerContactUseCase
}
