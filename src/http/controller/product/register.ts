import { AdmDoesNotExistsError } from '@/error/adm/admDoesNotExistsError'
import { ProductAlredyExistError } from '@/error/product/productalredyexisterror'
import { registerProductFactorie } from '@/http/use-cases/product/factories/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerProduct(req: FastifyRequest, res: FastifyReply) {
  const factorieProductRegister = registerProductFactorie()

  // const registerParamsSchema = z.object({
  //   adm_id: z.coerce.string(),
  // })

  const registerBodySchema = z.object({
    name: z.coerce.string(),
    description: z.string(),
    link_img: z.coerce.string(),
    unit_price: z.coerce.number(),
    adm_id: z.coerce.string(),
  })

  const { name, description, link_img, unit_price, adm_id } =
    registerBodySchema.parse(req.body)
  // const {  } = registerParamsSchema.parse(req.params)

  try {
    await factorieProductRegister.execute({
      name,
      description,
      link_img,
      unit_price,
      adm_id,
    })
    return res.status(200).send({
      message: 'Product created successfully!',
    })
  } catch (error) {
    if (
      error instanceof ProductAlredyExistError ||
      error instanceof AdmDoesNotExistsError
    ) {
      return res.status(409).send({
        error: error.message,
      })
    }
    return res.status(500).send()
  }
}
