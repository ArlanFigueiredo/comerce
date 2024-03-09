import { Account, Prisma } from '@prisma/client'

export interface AccountRepository {
  findAllAccounts(): Promise<Account[] | null>
  create(data: Prisma.AccountCreateManyInput): Promise<Account>
}
