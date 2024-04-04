import { InvalidCredentialsError } from '@/error/user/credentialsInvalidError'
import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { User } from '@prisma/client'

export interface IUserErrorUseCase {
  checkUserExistsByEmail(email: string): Promise<UserAlredyExistError | null>

  checkUserDoesNotExistById(id: string): Promise<UserDoesNotExistError | User>

  checkUserDoesNotByEmail(email: string): Promise<UserAlredyExistError | User>

  checkDataEquality(
    expectedValue: string | undefined,
    actualValue: string,
  ): Promise<InvalidCredentialsError | void>

  checkPasswordEquality(
    passwordWithoutHash: string,
    passwordWithHash: string,
  ): Promise<InvalidCredentialsError | void>
}
