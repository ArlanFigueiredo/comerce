import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { UpdateUserUseCase } from '../update'
import { ErrosUserUseCase } from '../errors/register'

export function factorieUpdateUser() {
  const userRepository = new PrismaUserRepository()
  const errosUserUseCase = new ErrosUserUseCase(userRepository)
  const updateUserUseCase = new UpdateUserUseCase(
    userRepository,
    errosUserUseCase,
  )
  return updateUserUseCase
}
