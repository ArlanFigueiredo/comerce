import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { registerUserFactorie } from '@/http/use-cases/user/factories/register'
import { factorieServiceSendingEmailRegisterUser } from '@/services/factories/sendingEmailRegisterUser'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const factorieUserRegister = registerUserFactorie()
  const sendingEmail = factorieServiceSendingEmailRegisterUser()

  const registerBodySchema = z.object({
    name: z.coerce.string(),
    email: z.coerce.string().email(),
    password: z.coerce.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    await factorieUserRegister.execute({
      name,
      email,
      password,
    })
    await sendingEmail.serviceSendingEmail({
      email,
    })
  } catch (error) {
    if (error instanceof UserAlredyExistError) {
      return res.status(409).send({
        message: error.message,
      })
    }
    return res.status(500).send()
  }
}
