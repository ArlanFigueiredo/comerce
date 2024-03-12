import { Password, Prisma } from '@prisma/client'

export interface PasswordRepository {
  updateUsed(token: string): Promise<Password>
  findByTokenUsed(token: string): Promise<Password | null>
  findByToken(token: string): Promise<Password | null>
  findByEmail(email: string): Promise<Password | null>
  findById(id: string): Promise<Password | null>
  findByUserId(user_id: string): Promise<Password | null>
  create(data: Prisma.PasswordCreateManyInput): Promise<Password>
}
