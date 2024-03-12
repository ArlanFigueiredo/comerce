import { PrismaPasswordRepository } from '@/http/repositories/password/prisma-password-repository'
import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { RegisterPasswordUseCase } from '../register'

export function factorieRegisterPassword() {
  const passwordRepository = new PrismaPasswordRepository()
  const userRepository = new PrismaUserRepository()
  const registerPasswordUseCase = new RegisterPasswordUseCase(
    passwordRepository,
    userRepository,
  )
  return registerPasswordUseCase
}
