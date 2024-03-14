import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { UserRepository } from '@/http/repositories/user/user-repository'
import { User } from '@prisma/client'

interface UpdateUserUseCaseRequest {
  id: string
  name?: string
  email?: string
  password?: string
}
interface UpdateUserUseCaseResponse {
  user: User | null
}
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
    name,
    email,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExist = await this.userRepository.findById(id)
    if (!userExist) {
      throw new UserDoesNotExistError()
    }

    const userByEmail = await this.userRepository.findByEmail(userExist.email)

    if (userByEmail) {
      throw new UserAlredyExistError()
    }

    const user = await this.userRepository.update({
      id,
      name,
      email,
      password,
    })

    return {
      user,
    }
  }
}
