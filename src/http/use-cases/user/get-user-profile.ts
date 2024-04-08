import { User } from '@prisma/client'
import { ErrosUserUseCase } from './errors/register'

interface GetUserProfileUserUseCaseRequest {
  userId: string
}

interface GetUserProfileUserUseCaseResponse {
  user: User
}

export class GetUserProfileUserUseCase {
  constructor(private errorUserUseCase: ErrosUserUseCase) {}

  async execute({
    userId,
  }: GetUserProfileUserUseCaseRequest): Promise<GetUserProfileUserUseCaseResponse> {
    const user = await this.errorUserUseCase.checkUserDoesNotExistById(userId)

    return {
      user,
    }
  }
}
