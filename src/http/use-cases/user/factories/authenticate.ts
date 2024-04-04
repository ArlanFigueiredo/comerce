import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { AuthenticateUserUseCase } from '../authenticate'
import { ErrosUserUseCase } from '../errors/register'

export function factorieAuthenticateUser() {
  const userRepository = new PrismaUserRepository()
  const errosUserUseCase = new ErrosUserUseCase(userRepository)
  const authenticateUserUseCase = new AuthenticateUserUseCase(errosUserUseCase)
  return authenticateUserUseCase
}
