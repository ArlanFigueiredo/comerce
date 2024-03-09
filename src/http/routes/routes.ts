import { FastifyInstance } from 'fastify'
import { register } from '../controller/user/register'
import { registerAdm } from '../controller/adm/register'
import { registerProduct } from '../controller/product/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/adm', registerAdm)
  app.post('/products', registerProduct)
}
