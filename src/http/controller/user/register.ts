import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { registerUserFactorie } from '@/http/use-cases/user/factories/register'
import { factorieServiceSendingEmailRegisterUser } from '@/services/factories/sendingEmailRegisterUser'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterFormErrorHandling } from './errors/register'
import { validateRegisterBodySchema } from './zod-validation/register'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const factorieUserRegister = registerUserFactorie()

  const sendingEmail = factorieServiceSendingEmailRegisterUser()

  const { name, email, password } = await validateRegisterBodySchema(req)

  try {
    const response = await RegisterFormErrorHandling({
      res,
      name,
      email,
      password,
    })
    console.log(response)
    await factorieUserRegister.execute({
      name,
      email,
      password,
    })
    await sendingEmail.serviceSendingEmail({
      email,
    })
    return res.status(201).send({
      message: 'Usuario criado com sucesso!',
    })
  } catch (error) {
    if (error instanceof UserAlredyExistError) {
      return res.status(409).send({
        message: error.message,
      })
    }
    return res.status(409).send({
      error,
    })
  }
}
