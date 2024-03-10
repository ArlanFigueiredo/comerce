import { factorieGetProducts } from '@/http/use-cases/product/factories/get-products'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllProducts(req: FastifyRequest, res: FastifyReply) {
  const getProductsFactorie = factorieGetProducts()

  try {
    const products = await getProductsFactorie.execute()
    return res.status(201).send({
      products,
    })
  } catch (error) {
    return res.status(500).send()
  }
}
