import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { factorieUpdateUser } from '@/http/use-cases/user/factories/update'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateUser(req: FastifyRequest, res: FastifyReply) {
  const updateUserFactory = factorieUpdateUser()

  const updateBodySchema = z.object({
    name: z.coerce.string().optional(),
    email: z.coerce.string().email().optional(),
    password: z.coerce.string().min(6).optional(),
  })

  const updateParamsSchema = z.object({
    id: z.coerce.string(),
  })

  const { name, email, password } = updateBodySchema.parse(req.body)
  const { id } = updateParamsSchema.parse(req.params)

  try {
    await updateUserFactory.execute({
      id,
      name,
      email,
      password,
    })
    return res.status(201).send({
      message: 'Data atualized successfully!',
    })
  } catch (error) {
    if (
      error instanceof UserDoesNotExistError ||
      error instanceof UserAlredyExistError
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
