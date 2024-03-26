import { AdmDoesNotExistsError } from '@/error/adm/admDoesNotExistsError'
import { ProductDoesNotExistsError } from '@/error/product/productDoesNotExistError'
import { factorieDeleteProduct } from '@/http/use-cases/product/factories/delete'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteProduct(req: FastifyRequest, res: FastifyReply) {
  const deleteProductFactorie = factorieDeleteProduct()

  const deleteBodyParams = z.object({
    id: z.coerce.string(),
    adm_id: z.coerce.string(),
  })

  const { id, adm_id } = deleteBodyParams.parse(req.params)

  try {
    await deleteProductFactorie.execute({
      id,
      adm_id,
    })
    return res.status(201).send({
      message: 'Deleted product successfully!',
    })
  } catch (error) {
    if (
      error instanceof AdmDoesNotExistsError ||
      error instanceof ProductDoesNotExistsError
    ) {
      return res.status(409).send({
        message: error.message,
      })
    }
    return res.status(500).send()
  }
}
