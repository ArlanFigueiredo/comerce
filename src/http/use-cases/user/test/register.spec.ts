import { expect, describe, it } from 'vitest'
import { RegisterUserUseCase } from '../register'
import { compare } from 'bcryptjs'
import { ImMemoryUserRepository } from '@/http/repositories/user/im-memory'
import { factorieRegisterPassword } from '../../password/factories/register'
import { factorieRecoverPassword } from '../factories/recover-password'

describe('Register User Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUserUseCase = new RegisterUserUseCase(
      new ImMemoryUserRepository(),
    )

    const { user } = await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example1@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Testing and the password recovery functionality is working', async () => {
    const registerPasswordFactory = factorieRegisterPassword()

    const token = await registerPasswordFactory.execute({
      email: 'example1@example.com',
      used: 0,
    })

    const recoverPasswordFactory = factorieRecoverPassword()

    const recoverpassword = await recoverPasswordFactory.execute({
      token: token.password.token,
      password: '123456789',
    })
    const password_hash1 = await compare(
      '123456789',
      recoverpassword.user.password,
    )
    expect(password_hash1).toBe(true)
  })

  it('Testing and the password recovery functionality is working, part two', async () => {
    const registerPasswordFactory = factorieRegisterPassword()

    const token = await registerPasswordFactory.execute({
      email: 'example1@example.com',
      used: 0,
    })

    const recoverPasswordFactory = factorieRecoverPassword()

    const recoverpassword = await recoverPasswordFactory.execute({
      token: token.password.token,
      password: '123456789',
    })
    const password_hash1 = await compare(
      '12345678',
      recoverpassword.user.password,
    )
    expect(password_hash1).toBe(false)
  })
})
