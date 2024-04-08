import { ImMemoryUserRepository } from '@/http/repositories/user/im-memory'
import { describe, expect, it } from 'vitest'
import { ImMemoryErrosUserUseCase } from './errors/Im-memory'
import { RegisterUserUseCase } from './register'
import { GetUserProfileUserUseCase } from './get-user-profile'
import { ResourceNotFoundError } from '@/error/user/reousorceNotFoundError'

describe('Testando funcionalidade de buscar perfil do usuario => Caso de uso do usuario', () => {
  it('Deverá retornar um objeto do tipo Usuario', async () => {
    const imMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      imMemoryUserRepository,
    )
    const registerUserUseCase = new RegisterUserUseCase(
      imMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )
    const getUserProfileUserUseCase = new GetUserProfileUserUseCase(
      imMemoryErrosUserUseCase,
    )
    await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example@gmail.com',
      password: '123456',
    })

    const user = await getUserProfileUserUseCase.execute({
      userId: '0001',
    })
    expect(user).toMatchObject(user)
  })

  it('Deverá retornar um erro de instancia do tipo => ResourceNotFoundError', async () => {
    const imMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      imMemoryUserRepository,
    )
    const registerUserUseCase = new RegisterUserUseCase(
      imMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )
    const getUserProfileUserUseCase = new GetUserProfileUserUseCase(
      imMemoryErrosUserUseCase,
    )
    await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example@gmail.com',
      password: '123456',
    })

    expect(async () => {
      await getUserProfileUserUseCase.execute({
        userId: '0000',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
