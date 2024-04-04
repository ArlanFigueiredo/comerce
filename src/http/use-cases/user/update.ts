import { UserRepository } from '@/http/repositories/user/user-repository'
import { User } from '@prisma/client'
import { ErrosUserUseCase } from './errors/register'

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
  constructor(
    private userRepository: UserRepository,
    private errosUserUseCase: ErrosUserUseCase,
  ) {}

  async execute({
    id,
    name,
    email,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExist = await this.errosUserUseCase.checkUserDoesNotExistById(id)

    await this.errosUserUseCase.checkDataEquality(email, userExist.email)

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
