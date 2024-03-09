import { Account, Prisma } from '@prisma/client'
import { AccountRepository } from './accout-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAccountRepository implements AccountRepository {
  async findAllAccounts(): Promise<Account[] | null> {
    const accounts = await prisma.account.findMany()
    return accounts
  }

  async create(data: Prisma.AccountCreateManyInput): Promise<Account> {
    const account = await prisma.account.create({
      data,
    })
    return account
  }
}
