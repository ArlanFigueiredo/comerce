// import { PrismaAccountRepository } from '@/http/repositories/accout/prisma-account-repository'
import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { RegisterUserUseCase } from '../register'
import { ErrosUserUseCase } from '../errors/register'

export function registerUserFactorie() {
  const userRepository = new PrismaUserRepository()
  const errorsUserRepository = new ErrosUserUseCase(userRepository)
  // const accountRepository = new PrismaAccountRepository()
  const registerUserUseCase = new RegisterUserUseCase(
    userRepository,
    errorsUserRepository,

    // accountRepository,
  )
  return registerUserUseCase
}
