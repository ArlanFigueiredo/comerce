import { UserRepository } from '@/http/repositories/user/user-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ErrosUserUseCase } from './errors/register'

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
    private errorUserUseCase: ErrosUserUseCase,
    // private accountRepository: AccountRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    await this.errorUserUseCase.checkUserExistsByEmail(email)

    const password_hash = await hash(password, 6)

    const user = await this.userRepository.create({
      name,
      email,
      password: password_hash,
    })

    // await this.accountRepository.create({
    //   type_account: 'User',
    //   type: 0,
    //   adm_id: undefined,
    //   user_id: user.id,
    // })

    return {
      user,
    }
  }
}
