import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { factorieRegisterPassword } from '@/http/use-cases/password/factories/register'
import { factorieServiceSendingEmailRegisterTokenPassword } from '@/services/factories/sendingEmailRegisterTokenPasswotd'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerTokenPassword(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const registerPasswordFactorie = factorieRegisterPassword()
  const sendingEmail = factorieServiceSendingEmailRegisterTokenPassword()

  const numeroAleatorio = Math.floor(Math.random() * 900000) + 100000
  console.log(numeroAleatorio)
  const newToken = numeroAleatorio.toString()
  const registerBodySchema = z.object({
    email: z.coerce.string().default(newToken),
    used: z.coerce.number().default(0),
  })

  const { email, used } = registerBodySchema.parse(req.body)

  try {
    const password = await registerPasswordFactorie.execute({
      email,
      used,
    })
    await sendingEmail.serviceSendingEmail({
      email,
      token: password.password.token,
    })
    return res.status(201).send({
      message: 'Created token sucessfully!',
      token: password.password.token,
      newToken,
    })
  } catch (error) {
    if (error instanceof UserDoesNotExistError) {
      return res.status(404).send({
        message: error.message,
      })
    }
    return res.status(500).send({ error })
  }
}
