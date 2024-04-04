import { InvalidCredentialsError } from '@/error/user/credentialsInvalidError'
import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { UserRepository } from '@/http/repositories/user/user-repository'
import { compare } from 'bcryptjs'
import { IUserErrorUseCase } from './IErrorUserUseCase'

export class ErrosUserUseCase implements IUserErrorUseCase {
  constructor(private userRepository: UserRepository) {}

  async checkUserExistsByEmail(email: string) {
    const emailExist = await this.userRepository.findByEmail(email)
    if (emailExist) {
      throw new UserAlredyExistError()
    }
    return null
  }

  async checkUserDoesNotExistById(id: string) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new UserDoesNotExistError()
    }
    return user
  }

  async checkUserDoesNotByEmail(email: string) {
    const emailExist = await this.userRepository.findByEmail(email)
    if (!emailExist) {
      throw new InvalidCredentialsError()
    }
    return emailExist
  }

  async checkDataEquality(
    expectedValue: string | undefined,
    actualValue: string,
  ) {
    if (expectedValue === actualValue) {
      throw new UserAlredyExistError()
    }
  }

  async checkPasswordEquality(
    passwordWithoutHash: string,
    passwordWithHash: string,
  ) {
    const isPasswordHashed = await compare(
      passwordWithoutHash,
      passwordWithHash,
    )
    if (isPasswordHashed === false) {
      throw new InvalidCredentialsError()
    }
  }
}
