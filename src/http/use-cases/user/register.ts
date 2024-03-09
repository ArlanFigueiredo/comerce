import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { AccountRepository } from '@/http/repositories/accout/accout-repository'
import { UserRepository } from '@/http/repositories/user/user-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}
interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private accountRepository: AccountRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlredyExistError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.userRepository.create({
      name,
      email,
      password: password_hash,
    })

    await this.accountRepository.create({
      type_account: 'User',
      type: 0,
      adm_id: undefined,
      user_id: user.id,
    })

    return {
      user,
    }
  }
}
