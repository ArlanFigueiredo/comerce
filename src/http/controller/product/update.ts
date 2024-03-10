import { AdmDoesNotExistsError } from '@/error/adm/admDoesNotExistsError'
import { ProducDoesNotExistsError } from '@/error/product/productDoesNotExistError'
import { PrismaAdmRepository } from '@/http/repositories/adm/prisma-adm-repository'
import { PrismaProductRepository } from '@/http/repositories/product/prisma-product-repository'
import { UpdateProductUseCase } from '@/http/use-cases/product/update'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateProduct(req: FastifyRequest, res: FastifyReply) {
  const admRepository = new PrismaAdmRepository()
  const productRepository = new PrismaProductRepository()
  const updateProductUseCase = new UpdateProductUseCase(
    productRepository,
    admRepository,
  )

  const updateBodySchema = z.object({
    name: z.coerce.string(),
    description: z.coerce.string(),
    link_img: z.coerce.string(),
    unit_price: z.coerce.number(),
  })

  const updateParamsSchema = z.object({
    id: z.coerce.string(),
    adm_id: z.coerce.string(),
  })

  const { name, description, link_img, unit_price } = updateBodySchema.parse(
    req.body,
  )

  const { id, adm_id } = updateParamsSchema.parse(req.params)

  try {
    const product = await updateProductUseCase.execute({
      id,
      adm_id,
      name,
      description,
      link_img,
      unit_price,
    })
    return res.status(201).send({
      message: 'Update to product successfully!',
      product,
    })
  } catch (error) {
    if (
      error instanceof AdmDoesNotExistsError ||
      error instanceof ProducDoesNotExistsError
    ) {
      return res.status(409).send({
        message: error.message,
      })
    }
    return res.status(500).send()
  }
}
