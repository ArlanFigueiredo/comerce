import { UserRepository } from '@/http/repositories/user/user-repository'
import { User } from '@prisma/client'

interface GetUserUseCaseResponse {
  user: User[] | null
}

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findAllUsers()
    user?.forEach((users) => {
      users.password = ''
    })
    return {
      user,
    }
  }
}
