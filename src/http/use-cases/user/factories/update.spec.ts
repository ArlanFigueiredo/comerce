import { describe, expect, it } from 'vitest'
import { UpdateUserUseCase } from '../update'
import { factorieUpdateUser } from './update'

describe('factorieUpdateUserUseCase', () => {
  it('deve retornar uma instância válida de UpdateUserUseCase', () => {
    const updateUserUseCaseFactorie = factorieUpdateUser()
    expect(updateUserUseCaseFactorie).toBeInstanceOf(UpdateUserUseCase)
  })
})
