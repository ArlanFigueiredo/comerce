import { Prisma, User } from '@prisma/client'
import { UserRepository } from './user-repository'
import { prisma } from '@/lib/prisma'

interface UpdateUser {
  id: string
  name?: string
  email?: string
  password?: string
}



export class PrismaUserRepository implements UserRepository {
  async findAllUsersByEmail(email:string[]):Promise<User[] | null>{
    
    const listEmail:string[] = []

    email.forEach((list) => {
      listEmail.push(list)
    })

    const user = await prisma.user.findMany({
      where: {
        email: {
          in: listEmail
        },
      }
    })
    return user
  }

  async findAllUsers(): Promise<User[] | null> {
    const user = await prisma.user.findMany()
    return user
  }

  async update({
    id,
    name,
    email,
    password,
  }: UpdateUser): Promise<User | null> {
    const user = await prisma.user.update({
      data: {
        name,
        email,
        password,
      },
      where: {
        id,
      },
    })
    return user
  }

  async updatePassword(id: string, password: string): Promise<User> {
    const user = await prisma.user.update({
      data: {
        password,
      },
      where: {
        id,
      },
    })
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
