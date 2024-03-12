import { Password, Prisma } from '@prisma/client'
import { PasswordRepository } from './password-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPasswordRepository implements PasswordRepository {
  async updateUsed(token: string): Promise<Password> {
    const password = await prisma.password.update({
      data: {
        used: 1,
      },
      where: {
        token,
      },
    })
    return password
  }

  async findByTokenUsed(token: string): Promise<Password | null> {
    const password = await prisma.password.findFirst({
      where: {
        token,
        used: 0,
      },
    })
    return password
  }

  async findByToken(token: string): Promise<Password | null> {
    const password = await prisma.password.findUnique({
      where: {
        token,
      },
    })
    return password
  }

  async findByEmail(email: string): Promise<Password | null> {
    const password = await prisma.password.findFirst({
      where: {
        email,
      },
    })
    return password
  }

  async findById(id: string): Promise<Password | null> {
    const password = await prisma.password.findFirst({
      where: {
        id,
      },
    })
    return password
  }

  async findByUserId(user_id: string): Promise<Password | null> {
    const password = await prisma.password.findFirst({
      where: {
        user_id,
      },
    })
    return password
  }

  async create(data: Prisma.PasswordCreateManyInput): Promise<Password> {
    const password = await prisma.password.create({
      data,
    })
    return password
  }
}
