import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { factorieRegisterOrder } from '@/http/use-cases/order/factories/register'
import { ProducDoesNotExistsError } from '@/error/product/productDoesNotExistError'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'

export async function registerOrder(req: FastifyRequest, res: FastifyReply) {
  const registerOrderFactories = factorieRegisterOrder()

  const registerBodySchema = z.object({
    quantity_product: z.coerce.number(),
    total_price: z.coerce.number(),
  })

  const registerParamsSchema = z.object({
    product_id: z.coerce.string(),
    user_id: z.coerce.string(),
  })

  const { quantity_product, total_price } = registerBodySchema.parse(req.body)
  const { product_id, user_id } = registerParamsSchema.parse(req.params)

  try {
    await registerOrderFactories.execute({
      quantity_product,
      total_price,
      product_id,
      user_id,
    })
    return res.status(201).send({
      message: 'Order created successsfully!',
    })
  } catch (error) {
    if (
      error instanceof ProducDoesNotExistsError ||
      error instanceof UserDoesNotExistError
    ) {
      return res.status(409).send({
        error: error.message,
        nameError: error.name,
      })
    }
    return res.status(500).send()
  }
}
