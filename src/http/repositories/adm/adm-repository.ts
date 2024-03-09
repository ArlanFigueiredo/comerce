import { Adm, Prisma } from '@prisma/client'

export interface AdmRepository {
  findUsername(username: string): Promise<Adm | null>
  findById(id: string): Promise<Adm | null>
  create(data: Prisma.AdmCreateInput): Promise<Adm>
}
