import { factorieGetOrder } from '@/http/use-cases/order/factories/get'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllOrders(req: FastifyRequest, res: FastifyReply) {
  const getOrderFactorie = factorieGetOrder()

  try {
    const orders = await getOrderFactorie.execute()
    return res.status(201).send({
      orders,
    })
  } catch (error) {
    return res.status(409).send({
      message: error,
    })
  }
}
