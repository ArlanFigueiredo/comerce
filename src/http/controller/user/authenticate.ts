import { InvalidCredentialsError } from '@/error/user/credentialsInvalidError'
import { factorieAuthenticateUser } from '@/http/use-cases/user/factories/authenticate'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateUser(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.coerce.string().email(),
    password: z.coerce.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const user = await factorieAuthenticateUser().execute({
      email,
      password,
    })
    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.user?.id,
        },
      },
    )

    const refreshToken = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.user?.id,
          expiresIn: '7d',
        },
      },
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(201)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(409).send({
        message: error.message,
      })
    }
    return res.status(500).send({
      error,
    })
  }
}
