import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { ErrosUserUseCase } from '../errors/register'
import { GetUserProfileUserUseCase } from '../get-user-profile'

export function factorieGetUserProfileUseCase() {
  const userRepository = new PrismaUserRepository()
  const errosUserUseCase = new ErrosUserUseCase(userRepository)
  const getUserProfileUserUseCase = new GetUserProfileUserUseCase(
    errosUserUseCase,
  )
  return getUserProfileUserUseCase
}
