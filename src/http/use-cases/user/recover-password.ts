import { InformationDoesNotMatchError } from '@/error/password/informationDoesNotMatchError'
import { InvalidTokenError } from '@/error/password/invalidTokenError'
import { TokenDoesNotExistsError } from '@/error/password/tokenDoesNotExistsError'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { PasswordRepository } from '@/http/repositories/password/password-repository'
import { UserRepository } from '@/http/repositories/user/user-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RecoverPasswordUseCaseRequest {
  token: string
  password: string
}
interface RecoverPasswordUseCaseResponse {
  user: User
}

export class RecoverPasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordRepository: PasswordRepository,
  ) {}

  async execute({
    token,
    password,
  }: RecoverPasswordUseCaseRequest): Promise<RecoverPasswordUseCaseResponse> {
    const resultToken = await this.passwordRepository.findByToken(token)

    if (!resultToken) {
      throw new TokenDoesNotExistsError()
    }

    if (resultToken.used !== 0) {
      throw new InvalidTokenError()
    }
    const userByEmail = await this.userRepository.findByEmail(resultToken.email)
    if (!userByEmail) {
      throw new UserDoesNotExistError()
    }

    const tokenIsValid = await this.passwordRepository.findByTokenUsed(token)
    if (!tokenIsValid) {
      throw new InvalidTokenError()
    }

    const userById = await this.userRepository.findById(resultToken.user_id)
    if (!userById) {
      throw new UserDoesNotExistError()
    }

    if (
      resultToken.user_id !== userById.id ||
      resultToken.email !== userByEmail.email
    ) {
      throw new InformationDoesNotMatchError()
    }

    password = await hash(password, 6)
    const user = await this.userRepository.updatePassword(userById.id, password)

    await this.passwordRepository.updateUsed(token)

    return {
      user,
    }
  }
}
