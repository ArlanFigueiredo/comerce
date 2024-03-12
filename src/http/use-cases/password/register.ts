import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { PasswordRepository } from '@/http/repositories/password/password-repository'
import { UserRepository } from '@/http/repositories/user/user-repository'
import { Password } from '@prisma/client'

interface RegisterPasswordUseCaseResponse {
  password: Password
}
interface RegisterPasswordUseCaseRequest {
  email: string
  used: number
}

export class RegisterPasswordUseCase {
  constructor(
    private passwordRepository: PasswordRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    email,
    used,
  }: RegisterPasswordUseCaseRequest): Promise<RegisterPasswordUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new UserDoesNotExistError()
    }

    const password = await this.passwordRepository.create({
      email,
      used,
      user_id: user.id,
    })

    return {
      password,
    }
  }
}
