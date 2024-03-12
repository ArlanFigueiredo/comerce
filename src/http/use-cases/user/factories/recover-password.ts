import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { PrismaPasswordRepository } from '@/http/repositories/password/prisma-password-repository'
import { RecoverPasswordUseCase } from '../recover-password'

export function factorieRecoverPassword() {
  const userRepository = new PrismaUserRepository()
  const passwordRepository = new PrismaPasswordRepository()
  const recoverPasswordUseCase = new RecoverPasswordUseCase(
    userRepository,
    passwordRepository,
  )
  return recoverPasswordUseCase
}
