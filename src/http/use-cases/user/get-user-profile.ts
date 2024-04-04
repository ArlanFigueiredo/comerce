import { ResourceNotFoundError } from '@/error/user/reousorceNotFoundError'
import { UserRepository } from '@/http/repositories/user/user-repository'
import { User } from '@prisma/client'

interface GetUserProfileUserUseCaseRequest {
  userId: string
}

interface GetUserProfileUserUseCaseResponse {
  user: User
}

export class GetUserProfileUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileUserUseCaseRequest): Promise<GetUserProfileUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
