import { InvalidCredentialsError } from '@/error/user/credentialsInvalidError'
import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { ImMemoryUserRepository } from '@/http/repositories/user/im-memory'
import { expect, describe, it } from 'vitest'
import { RegisterUserUseCase } from '../register'
import { ImMemoryErrosUserUseCase } from './Im-memory'
import { ResourceNotFoundError } from '@/error/user/reousorceNotFoundError'

describe('Testing error handling (exceptions) for the user use case', () => {
  it('It should return instance error => UserAlredyExistError', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )
    const registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example@gmail.com',
      password: '123456',
    })

    await expect(() =>
      imMemoryErrosUserUseCase.checkUserExistsByEmail('example@gmail.com'),
    ).rejects.toBeInstanceOf(UserAlredyExistError)
  })

  it('It should return null', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )
    const registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example1@gmail.com',
      password: '123456',
    })

    const result =
      await imMemoryErrosUserUseCase.checkUserExistsByEmail(
        'example2@gmail.com',
      )

    expect(result).toBeNull()
  })

  //
  //

  it('It should return an instance error => UserDoesNotExistError', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )

    const registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example1@gmail.com',
      password: '123456',
    })

    expect(async () => {
      await imMemoryErrosUserUseCase.checkUserDoesNotExistById('000')
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('It should return user', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )
    const registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    const user = await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example1@gmail.com',
      password: '123456',
    })

    const userId = user.user.id
    const result =
      await imMemoryErrosUserUseCase.checkUserDoesNotExistById(userId)
    expect(result).not.toBeNull()
    expect(result).toMatchObject(result)
  })

  //
  //

  it('It should return an instance error => InvalidCredentialsError', async () => {
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

  it('It should return an instance error => InvalidCredentialsError', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )

    const registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'arlan.carloz@gmail.com',
      password: '123456',
    })

    const user = await imMemoryErrosUserUseCase.checkUserDoesNotByEmail(
      'arlan.carloz@gmail.com',
    )
    expect(user).not.toBeNull()
    expect(user).toMatchObject(user)
  })
  //
  //
  it('It should return an instance error => UserAlredyExistError', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )
    const expectedValue = 'value1'
    const actualValue = 'value1'
    await expect(() =>
      imMemoryErrosUserUseCase.checkDataEquality(expectedValue, actualValue),
    ).rejects.toBeInstanceOf(UserAlredyExistError)
  })

  it('It should return an instance error => UserAlredyExistError', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )
    const expectedValue = 'example@gmail.com'
    const actualValue = 'example-test@gmail.com'

    const check = await imMemoryErrosUserUseCase.checkDataEquality(
      expectedValue,
      actualValue,
    )
    expect(check).toBeNull()
  })
  //
  //
  it('It should return an instance error => InvalidCredentialsError', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )

    const registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    const user = await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example@gmail.com',
      password: '123456',
    })

    const passwordWithoutHash = '12345'
    const passwordWithHash = user.user.password

    await expect(() =>
      imMemoryErrosUserUseCase.checkPasswordEquality(
        passwordWithoutHash,
        passwordWithHash,
      ),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('It should return null', async () => {
    const inMemoryUserRepository = new ImMemoryUserRepository()
    const imMemoryErrosUserUseCase = new ImMemoryErrosUserUseCase(
      inMemoryUserRepository,
    )

    const registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      imMemoryErrosUserUseCase,
    )

    const user = await registerUserUseCase.execute({
      name: 'ExampleName',
      email: 'example@gmail.com',
      password: '123456',
    })

    const passwordWithoutHash = '123456'
    const passwordWithHash = user.user.password

    const result = await imMemoryErrosUserUseCase.checkPasswordEquality(
      passwordWithoutHash,
      passwordWithHash,
    )
    expect(result).toBeNull()
  })
})
