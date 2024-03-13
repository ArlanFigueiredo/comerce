import { expect, describe, it } from 'vitest'
import { RegisterUserUseCase } from '../register'
import { compare } from 'bcryptjs'
import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'

describe('Register User Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUserUseCase = new RegisterUserUseCase(
      new PrismaUserRepository(),
    )

    const { user } = await registerUserUseCase.execute({
      name: 'Arlan',
      email: 'arlan1sasa@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
