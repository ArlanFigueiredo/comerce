import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { GetUserUseCase } from '../get'

export function factorieGetUser() {
  const userRepository = new PrismaUserRepository()
  const getUserUseCase = new GetUserUseCase(userRepository)
  return getUserUseCase
}
