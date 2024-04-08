import { AuthenticateUserUseCase } from '../authenticate'
import { describe, expect, it } from 'vitest'
import { factorieAuthenticateUser } from './authenticate'

describe('factorieAuthenticateUser', () => {
  it('deve retornar uma instância válida de AuthenticateUserUseCase', () => {
    const authenticateUserUseCase = factorieAuthenticateUser()

    expect(authenticateUserUseCase).toBeInstanceOf(AuthenticateUserUseCase)
  })
})
