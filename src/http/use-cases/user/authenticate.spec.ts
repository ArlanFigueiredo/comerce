import { ImMemoryErrosUserUseCase } from './errors/Im-memory'
import { AuthenticateUserUseCase } from './authenticate'
import { ImMemoryUserRepository } from '@/http/repositories/user/im-memory'
import { describe, it, expect } from 'vitest'
import { RegisterUserUseCase } from './register'
import { InvalidCredentialsError } from '@/error/user/credentialsInvalidError'

describe('Testing method controller authenticate', () => {
  it('Testando a funcionalidade do controller de autenticação', async () => {
    const imMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      imMemoryUserRepository,
    )
    const registerUserUseCase = new RegisterUserUseCase(
      imMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      imMemoryErrosUserUseCase,
    )
    await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example@gmail.com',
      password: '123456',
    })

    const user = await authenticateUserUseCase.execute({
      email: 'example@gmail.com',
      password: '123456',
    })

    expect(user).toMatchObject(user)
  })

  // Nesse teste estou enviando email diferente
  it('Deverá retornar erro de instancia => InvalidCredentialsError', async () => {
    const imMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      imMemoryUserRepository,
    )
    const registerUserUseCase = new RegisterUserUseCase(
      imMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      imMemoryErrosUserUseCase,
    )
    await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example@gmail.com',
      password: '123456',
    })

    expect(
      async () =>
        await authenticateUserUseCase.execute({
          email: 'example1@gmail.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  // Nesse teste estou enviando o password diferente
  it('Deverá retornar erro de instancia => InvalidCredentialsError', async () => {
    const imMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      imMemoryUserRepository,
    )
    const registerUserUseCase = new RegisterUserUseCase(
      imMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      imMemoryErrosUserUseCase,
    )
    await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example@gmail.com',
      password: '123456',
    })

    expect(
      async () =>
        await authenticateUserUseCase.execute({
          email: 'example@gmail.com',
          password: '1234567',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
