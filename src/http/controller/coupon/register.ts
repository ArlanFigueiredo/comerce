import { CouponAlredyExistsError } from '@/error/coupon/couponAlredyExistsError'
import { factorieRegisterCoupon } from '@/http/use-cases/coupon/factories/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerCoupon(req: FastifyRequest, res: FastifyReply) {
  const registerCouponFactory = factorieRegisterCoupon()

  const registerBodySchema = z.object({
    name: z.coerce.string(),
    discount_value: z.coerce.number(),
    discount_type: z.coerce.string(),
    active: z.boolean().default(true),
  })

  const { name, discount_value, discount_type, active } =
    registerBodySchema.parse(req.body)

  try {
    const coupon = await registerCouponFactory.execute({
      name,
      discount_value,
      discount_type,
      active,
    })
    return res.status(201).send({
      message: 'Cupom criado com sucesso!',
      coupon,
    })
  } catch (error) {
    if (error instanceof CouponAlredyExistsError) {
      return res.status(400).send({
        message: error.message,
      })
    }
    return res.status(400).send({
      message: 'Erro ao processar a solicitação',
      error,
    })
  }
}
