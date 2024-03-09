import { AdmAlredyExistsError } from '@/error/adm/admAlredyExistError'
import { registerAdmFactorie } from '@/http/use-cases/adm/factories/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerAdm(req: FastifyRequest, res: FastifyReply) {
  const factorieAdmRegister = registerAdmFactorie()

  const registerBodySchema = z.object({
    username: z.coerce.string().email(),
    password: z.coerce.string().min(6),
  })

  const { username, password } = registerBodySchema.parse(req.body)

  try {
    await factorieAdmRegister.execute({
      username,
      password,
    })
    return res.status(200).send({
      message: 'Account created successfully!',
    })
  } catch (error) {
    if (error instanceof AdmAlredyExistsError) {
      return res.status(409).send({
        error: error.message,
      })
    }
    return res.status(500).send()
  }
}
