import { ImMemoryErrosUserUseCase } from './../errors/Im-memory'
import { expect, describe, it } from 'vitest'
import { RegisterUserUseCase } from '../register'
import { compare } from 'bcryptjs'
import { ImMemoryUserRepository } from '@/http/repositories/user/im-memory'
import { UserAlredyExistError } from '@/error/user/userAlredyExistError'

describe('Register User Use Case', () => {
  it('should hash user password upon registration', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )
    const { user } = await new RegisterUserUseCase(
      inMemoryUserRepository,
      imMemoryErrosUserUseCase,
    ).execute({
      name: 'ExampleName',
      email: 'example1@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Checking if the user is not registering twice', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )
    const registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    inMemoryUserRepository.create({
      id: '0001',
      name: 'Arlan Figueiredo',
      email: 'example1@example.com',
      password: '123456',
      created_at: new Date(),
    })

    await expect(() =>
      registerUserUseCase.execute({
        name: 'Arlan Figueiredo',
        email: 'example1@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlredyExistError)
  })
})
