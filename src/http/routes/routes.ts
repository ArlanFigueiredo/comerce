import { FastifyInstance } from 'fastify'
import { register } from '../controller/user/register'
import { registerAdm } from '../controller/adm/register'
import { registerProduct } from '../controller/product/register'
import { registerOrder } from '../controller/order/register'
import { getAllProducts } from '../controller/product/get-products'
import { getAllOrders } from '../controller/order/get'
import { updateProduct } from '../controller/product/update'
import { deleteProduct } from '../controller/product/delete'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/adm', registerAdm)

  app.get('/products', getAllProducts)
  app.post('/product/:adm_id', registerProduct)
  app.put('/product/:id/:adm_id', updateProduct)
  app.delete('/product', deleteProduct)

  app.post('/order/:product_id/:user_id', registerOrder)
  app.get('/orders', getAllOrders)
}
