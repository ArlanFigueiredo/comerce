import { describe, expect, it } from 'vitest'
import { registerUserFactorie } from './register'
import { RegisterUserUseCase } from '../register'

describe('factorieRegisterUserUseCase', () => {
  it('deve retornar uma instância válida de RegisterUserUseCase', () => {
    const factorieRegisterUserUseCase = registerUserFactorie()

    expect(factorieRegisterUserUseCase).toBeInstanceOf(RegisterUserUseCase)
  })
})
