import { InvalidCredentialsError } from '@/error/user/credentialsInvalidError'
import { UserRepository } from '@/http/repositories/user/user-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUserUseCaseResponse {
  user: User | null
}
interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUserUseCase {
  constructor(private userRespository: UserRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRespository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }
    const isPasswordHashed = await compare(password, user.password)
    if (isPasswordHashed === false) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
