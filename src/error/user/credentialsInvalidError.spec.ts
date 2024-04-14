import { describe, it, expect } from 'vitest'
import { InvalidCredentialsError } from './credentialsInvalidError'

describe('Testing instance of CredentialsInvalidError', () => {
  it('should throw InvalidCredentialsError', () => {
    expect(() => {
      throw new InvalidCredentialsError()
    }).toThrow(InvalidCredentialsError)
  })

  it('should throw InvalidCredentialsError with correct message', () => {
    const errorMessage = 'Email ou senha estão incorretos'
    try {
      throw new InvalidCredentialsError()
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        expect(error.message).toBe(errorMessage)
        expect(typeof error.message).toBe('string')
      }
    }
  })
})
