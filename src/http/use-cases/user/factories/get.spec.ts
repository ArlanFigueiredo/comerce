import { describe, expect, it } from 'vitest'
import { factorieGetUser } from './get'
import { GetUserUseCase } from '../get'

describe('factorieGetUser', () => {
  it('deve retornar uma instância válida de GetUserUseCase', () => {
    const getUserUseCase = factorieGetUser()
    expect(getUserUseCase).toBeInstanceOf(GetUserUseCase)
  })
})
