import { EmailAlredyExistsError } from '@/error/send-promotation/emailAlredyExistError'
import { factoriesSendPromotationRegister } from '@/http/use-cases/send-promotation/factories/register'
import { factorieServiceSendingEmailSendPromotation } from '@/services/factories/sendingEmailSendPromotation'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerSendPromotation(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const registerSendPromotationFactory = factoriesSendPromotationRegister()
  const sendingEmailSendPromotation =
    factorieServiceSendingEmailSendPromotation()

  const registerBodySchema = z.object({
    email: z.coerce.string().email(),
  })

  const registerParamsSchema = z.object({
    userId: z.coerce.string().optional(),
  })

  const { userId } = registerParamsSchema.parse(req.params)
  const { email } = registerBodySchema.parse(req.body)

  try {
    const sendPromotation = await registerSendPromotationFactory.execute({
      userId,
      email,
    })
    await sendingEmailSendPromotation.serviceSendingEmail(
      sendPromotation.sendPromotation.email,
    )
    return res.status(201).send({
      message: 'Email cadastrado com sucesso!',
    })
  } catch (error) {
    if (error instanceof EmailAlredyExistsError) {
      return res.status(409).send({
        error: error.message,
      })
    }
    return res.status(409).send({
      error,
    })
  }
}
