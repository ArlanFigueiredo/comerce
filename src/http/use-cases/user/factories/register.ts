import { PrismaAccountRepository } from '@/http/repositories/accout/prisma-account-repository'
import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { RegisterUserUseCase } from '../register'

export function registerUserFactorie() {
  const userRepository = new PrismaUserRepository()
  const accountRepository = new PrismaAccountRepository()
  const registerUserUseCase = new RegisterUserUseCase(
    userRepository,
    accountRepository,
  )
  return registerUserUseCase
}
