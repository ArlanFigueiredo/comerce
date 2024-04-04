import { User } from '@prisma/client'
import { ErrosUserUseCase } from './errors/register'

interface AuthenticateUserUseCaseResponse {
  user: User | null
}
interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUserUseCase {
  constructor(private errosUserUseCase: ErrosUserUseCase) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.errosUserUseCase.checkUserDoesNotByEmail(email)

    await this.errosUserUseCase.checkPasswordEquality(password, user.password)

    return {
      user,
    }
  }
}
