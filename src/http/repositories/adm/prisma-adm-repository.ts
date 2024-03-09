import { Adm, Prisma } from '@prisma/client'
import { AdmRepository } from './adm-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAdmRepository implements AdmRepository {
  async findUsername(username: string): Promise<Adm | null> {
    const adm = await prisma.adm.findUnique({
      where: {
        username,
      },
    })
    return adm
  }

  async findById(id: string): Promise<Adm | null> {
    const adm = await prisma.adm.findUnique({
      where: {
        id,
      },
    })
    return adm
  }

  async create(data: Prisma.AdmCreateInput): Promise<Adm> {
    const adm = await prisma.adm.create({
      data,
    })
    return adm
  }
}
