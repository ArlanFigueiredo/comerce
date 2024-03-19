import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { AuthenticateUserUseCase } from '../authenticate'

export function factorieAuthenticateUser() {
  return new AuthenticateUserUseCase(new PrismaUserRepository())
}
