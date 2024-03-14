import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { UpdateUserUseCase } from '../update'

export function factorieUpdateUser() {
  const userRepository = new PrismaUserRepository()
  const updateUserUseCase = new UpdateUserUseCase(userRepository)
  return updateUserUseCase
}
