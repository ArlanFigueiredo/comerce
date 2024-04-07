import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export interface RegisterBodySchema {
  name: string
  email: string
  password: string
}

export async function validateRegisterBodySchema(req: FastifyRequest) {
  const registerBodySchema = z.object({
    name: z.coerce.string().min(1),
    email: z.coerce.string().email(),
    password: z.coerce.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  return registerBodySchema.parse({
    name,
    email,
    password,
  }) as RegisterBodySchema
}
