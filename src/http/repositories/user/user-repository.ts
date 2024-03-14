import { Prisma, User } from '@prisma/client'

interface UpdateUser {
  id: string
  name?: string
  email?: string
  password?: string
}

export interface UserRepository {
  findAllUsers(): Promise<User[] | null>
  update({ id, name, email, password }: UpdateUser): Promise<User | null>
  updatePassword(id: string, password: string): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
