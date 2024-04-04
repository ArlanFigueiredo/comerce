import { InvalidCredentialsError } from '@/error/user/credentialsInvalidError'
import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { ImMemoryUserRepository } from '@/http/repositories/user/im-memory'
import { compare } from 'bcryptjs'
import { ErrosUserUseCase } from './register'

export class ImMemoryErrosUserUseCase extends ErrosUserUseCase {
  constructor(private imMemoryUserRepository: ImMemoryUserRepository) {
    super(imMemoryUserRepository)
  }

  async checkUserExistsByEmail(email: string) {
    const emailExist = await this.imMemoryUserRepository.findByEmail(email)
    if (emailExist) {
      throw new UserAlredyExistError()
    }
    return null
  }

  async checkUserDoesNotExistById(id: string) {
    const user = await this.imMemoryUserRepository.findById(id)
    if (!user) {
      throw new UserDoesNotExistError()
    }
    return user
  }

  async checkDataEquality(value1: string | undefined, value2: string) {
    if (value1 === value2) {
      throw new UserAlredyExistError()
    }
  }

  async checkUserDoesNotByEmail(email: string) {
    const emailExist = await this.imMemoryUserRepository.findByEmail(email)
    if (!emailExist) {
      throw new InvalidCredentialsError()
    }
    return emailExist
  }

  async checkPasswordEquality(password_1: string, password_2: string) {
    const isPasswordHashed = await compare(password_1, password_2)
    if (isPasswordHashed === false) {
      throw new InvalidCredentialsError()
    }
  }
}
