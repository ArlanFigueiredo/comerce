import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'
import { factorieRegisterPassword } from '../../password/factories/register'
import { factorieRecoverPassword } from '../factories/recover-password'
import { RegisterUserUseCase } from '../register'
import { TokenDoesNotExistsError } from '@/error/password/tokenDoesNotExistsError'
import { ImMemoryUserRepository } from '@/http/repositories/user/im-memory'
import { ImMemoryErrosUserUseCase } from '../errors/Im-memory'

describe('Recover password', () => {
  it('Testing and the password recovery functionality is working', async () => {
    const imMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      imMemoryUserRepository,
    )
    const registerUserUseCase = new RegisterUserUseCase(
      imMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example1@example.com',
      password: '123456',
    })

    const registerPasswordFactory = factorieRegisterPassword()

    const token = await registerPasswordFactory.execute({
      email: 'example1@example.com',
      used: 0,
    })

    const recoverpassword = await factorieRecoverPassword().execute({
      token: token.password.token,
      password: '123456',
    })
    const password_hash1 = await compare(
      '123456',
      recoverpassword.user.password,
    )
    expect(password_hash1).toBe(true)
  })

  it('Testing and the password recovery functionality is working, part two', async () => {
    const imMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      imMemoryUserRepository,
    )
    await new RegisterUserUseCase(
      imMemoryUserRepository,
      imMemoryErrosUserUseCase,
    ).execute({
      name: 'ExampleName',
      email: 'example1@example.com',
      password: '123456',
    })

    const token = await factorieRegisterPassword().execute({
      email: 'example1@example.com',
      used: 0,
    })

    const recoverpassword = await factorieRecoverPassword().execute({
      token: token.password.token,
      password: '123456',
    })

    const password_hash1 = await compare(
      '1234567',
      recoverpassword.user.password,
    )

    expect(password_hash1).toBe(false)
  })

  it('Testing erro TokenDoesNotExist.', async () => {
    await expect(() =>
      factorieRecoverPassword().execute({
        token: 'token.password.token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(TokenDoesNotExistsError)
  })
})
