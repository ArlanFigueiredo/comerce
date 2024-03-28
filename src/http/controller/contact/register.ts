import { factorieRegisterContact } from '@/http/use-cases/contact/factories/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerContact(req: FastifyRequest, res: FastifyReply) {
  const registerContactFacotory = factorieRegisterContact()

  const registerBodySchema = z.object({
    name: z.coerce.string(),
    lastName: z.coerce.string(),
    email: z.coerce.string().email(),
    message: z.coerce.string(),
  })

  const { name, lastName, email, message } = registerBodySchema.parse(req.body)

  try {
    await registerContactFacotory.execute({
      name,
      lastName,
      email,
      message,
    })
    return res.status(201).send({
      message: 'Mensagem enviada com sucesso!',
    })
  } catch (error) {
    return res.status(409).send({
      error,
    })
  }
}
