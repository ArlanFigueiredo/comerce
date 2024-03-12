import { InformationDoesNotMatchError } from '@/error/password/informationDoesNotMatchError'
import { InvalidTokenError } from '@/error/password/invalidTokenError'
import { TokenDoesNotExistsError } from '@/error/password/tokenDoesNotExistsError'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { factorieRecoverPassword } from '@/http/use-cases/user/factories/recover-password'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function recoverPassword(req: FastifyRequest, res: FastifyReply) {
  const recoverPasswordFactorie = factorieRecoverPassword()

  const updateBodySchema = z.object({
    token: z.coerce.string(),
    password: z.coerce.string(),
  })

  const { token, password } = updateBodySchema.parse(req.body)

  try {
    await recoverPasswordFactorie.execute({
      token,
      password,
    })
    return res.status(201).send({
      message: 'Updated password successfully!',
    })
  } catch (error) {
    if (
      error instanceof TokenDoesNotExistsError ||
      error instanceof UserDoesNotExistError
    ) {
      return res.status(404).send({
        message: error.message,
      })
    } else if (
      error instanceof InformationDoesNotMatchError ||
      error instanceof InvalidTokenError
    ) {
      return res.status(409).send({
        message: error.message,
      })
    }
    return res.status(500).send({
      error,
    })
  }
}
