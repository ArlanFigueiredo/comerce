import { AdmAlredyExistsError } from '@/error/adm/admAlredyExistError'
import { PrismaAccountRepository } from '@/http/repositories/accout/prisma-account-repository'
import { AdmRepository } from '@/http/repositories/adm/adm-repository'
import { Adm } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterAdmUseCaseRequest {
  username: string
  password: string
}
interface RegisterAdmUseCaseResponse {
  adm: Adm
}

export class RegisterAdmUseCase {
  constructor(
    private admRepository: AdmRepository,
    private accountRepository: PrismaAccountRepository,
  ) {}

  async execute({
    username,
    password,
  }: RegisterAdmUseCaseRequest): Promise<RegisterAdmUseCaseResponse> {
    const admExists = await this.admRepository.findUsername(username)

    if (admExists) {
      throw new AdmAlredyExistsError()
    }

    const password_hash = await hash(password, 6)

    const adm = await this.admRepository.create({
      username,
      password: password_hash,
    })

    await this.accountRepository.create({
      type_account: 'Adm',
      type: 1,
      adm_id: adm.id,
      user_id: undefined,
    })

    return {
      adm,
    }
  }
}
