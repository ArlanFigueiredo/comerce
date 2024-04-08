import { describe, expect, it } from 'vitest'
import { factorieRecoverPassword } from './recover-password'
import { RecoverPasswordUseCase } from '../recover-password'

describe('factorieRecoverPassword', () => {
  it('deve retornar uma instância válida de RecoverPasswordUserUseCase', () => {
    const recoverPasswordFactorie = factorieRecoverPassword()
    expect(recoverPasswordFactorie).toBeInstanceOf(RecoverPasswordUseCase)
  })
})
