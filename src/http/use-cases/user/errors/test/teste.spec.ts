import { expect, describe, it } from 'vitest'

import { InvalidCredentialsError } from '@/error/user/credentialsInvalidError'
import { ImMemoryUserRepository } from '@/http/repositories/user/im-memory'
import { ImMemoryErrosUserUseCase } from '../Im-memory'

describe('', () => {
  it('Testing erro TokenDoesNotExist.', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )
    await expect(() =>
      imMemoryErrosUserUseCase.checkUserDoesNotByEmail(
        'arlan.carloz@gmail.com',
      ),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
