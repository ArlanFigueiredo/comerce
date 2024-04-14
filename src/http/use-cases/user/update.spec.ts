import { describe, it, expect } from 'vitest'
import { UpdateUserUseCase } from './update'
import { ImMemoryUserRepository } from '@/http/repositories/user/im-memory'
import { hash } from 'bcryptjs'
import { ImMemoryErrosUserUseCase } from './errors/Im-memory'
import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { ResourceNotFoundError } from '@/error/user/reousorceNotFoundError'

describe('Testing in functionality of update User Use Case', async () => {
  it('Return User atualized', async () => {
    const imMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      imMemoryUserRepository,
    )
    const updateUserUseCase = new UpdateUserUseCase(
      imMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    await imMemoryUserRepository.create({
      id: '0001',
      name: 'ExampleName1',
      email: 'example1@example.com',
      password: await hash('123456', 6),
      created_at: new Date(),
    })

    const user = await updateUserUseCase.execute({
      id: '0001',
      name: 'ExampleName',
      email: 'example@example.com',
      password: await hash('123456', 6),
    })

    expect(user).toMatchObject(user)
  })

  it('Return Instance of UserAlredyExistError', async () => {
    const imMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      imMemoryUserRepository,
    )
    const updateUserUseCase = new UpdateUserUseCase(
      imMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    await imMemoryUserRepository.create({
      id: '0001',
      name: 'ExampleName',
      email: 'example@example.com',
      password: await hash('123456', 6),
      created_at: new Date(),
    })

    expect(async () => {
      await updateUserUseCase.execute({
        id: '0001',
        name: 'ExampleName',
        email: 'example@example.com',
        password: await hash('123456', 6),
      })
    }).rejects.toBeInstanceOf(UserAlredyExistError)
  })

  it('Return Instance of ResourceNotFoundError', async () => {
    const imMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      imMemoryUserRepository,
    )
    const updateUserUseCase = new UpdateUserUseCase(
      imMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    await imMemoryUserRepository.create({
      id: '0001',
      name: 'ExampleName',
      email: 'example@example.com',
      password: await hash('123456', 6),
      created_at: new Date(),
    })

    expect(async () => {
      await updateUserUseCase.execute({
        id: '1',
        name: 'ExampleName',
        email: 'example@example.com',
        password: await hash('123456', 6),
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
