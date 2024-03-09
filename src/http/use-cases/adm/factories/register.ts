import { RegisterAdmUseCase } from './../register'
import { PrismaAccountRepository } from '@/http/repositories/accout/prisma-account-repository'
import { PrismaAdmRepository } from '@/http/repositories/adm/prisma-adm-repository'

export function registerAdmFactorie() {
  const admRepository = new PrismaAdmRepository()
  const accountRepository = new PrismaAccountRepository()
  const registerAdmUseCase = new RegisterAdmUseCase(
    admRepository,
    accountRepository,
  )
  return registerAdmUseCase
}
