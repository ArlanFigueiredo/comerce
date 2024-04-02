import { CouponDoesNotExistsError } from '@/error/coupon/couponDoesNotExistError'
import { factorieGetByName } from '@/http/use-cases/coupon/factories/get-by-name'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getByName(req: FastifyRequest, res: FastifyReply) {
  const getByNameFactory = factorieGetByName()

  const getParamsSchema = z.object({
    name: z.string().min(1).readonly(),
  })

  const { name } = getParamsSchema.parse(req.params)

  try {
    const coupon = await getByNameFactory.execute({
      name,
    })
    return res.status(200).send({
      coupon,
    })
  } catch (error) {
    if (error instanceof CouponDoesNotExistsError) {
      return res.status(404).send({
        error: error.message,
      })
    }
    return res.status(400).send({
      error,
    })
  }
}
