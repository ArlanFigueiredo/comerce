import { User, Prisma } from '@prisma/client'
import { UserRepository } from './user-repository'

// interface UpdateUser {
//   id: string
//   name?: string
//   email?: string
//   password?: string
// }

export class ImMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async findAllUsers() {
    return this.users
  }

  async update() {
    return null
  }

  async updatePassword(id: string, password: string) {
    const users: User[] = []
    this.users.forEach((user) => {
      if (user.id === id) {
        user.password = password
        users.push(user)
      }
    })

    return {
      id: users[0].id,
      name: users[0].name,
      email: users[0].email,
      password: users[0].password,
      created_at: users[0].created_at,
    }
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '0001',
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }
    this.users.push(user)
    return user
  }
}
