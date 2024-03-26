import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { factorieRegisterOrder } from '@/http/use-cases/order/factories/register'
import { UserDoesNotExistError } from '@/error/user/userDoesNotExistError'
import { factorieServiceSendingEmailRegisterOrder } from '@/services/factories/sendingEmailRegisterOrder'
import { ProductDoesNotExistsError } from '@/error/product/productDoesNotExistError'

export async function registerOrder(req: FastifyRequest, res: FastifyReply) {
  const registerOrderFactories = factorieRegisterOrder()
  const sendingEmail = factorieServiceSendingEmailRegisterOrder()

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
    const result = await registerOrderFactories.execute({
      quantity_product,
      total_price,
      product_id,
      user_id,
    })
    await sendingEmail.serviceSendingEmail({
      email: result.user.email,
      name_product: result.product.name,
      quantity_product: result.order.quantity_product,
      unit_price: result.product.unit_price,
    })

    return res.status(201).send({
      message: 'Order created successsfully!',
    })
  } catch (error) {
    if (
      error instanceof ProductDoesNotExistsError ||
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
