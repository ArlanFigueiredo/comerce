import { describe, expect, it } from 'vitest'
import { factorieGetUserProfileUseCase } from './get-user-profile'
import { GetUserProfileUserUseCase } from '../get-user-profile'

describe('factorieGetUser', () => {
  it('deve retornar uma instância válida de GetUserUseCase', () => {
    const getUserUseCase = factorieGetUserProfileUseCase()
    expect(getUserUseCase).toBeInstanceOf(GetUserProfileUserUseCase)
  })
})
