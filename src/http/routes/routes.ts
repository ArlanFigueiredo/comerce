import { FastifyInstance } from 'fastify'
import { register } from '../controller/user/register'
import { registerAdm } from '../controller/adm/register'
import { registerProduct } from '../controller/product/register'
import { registerOrder } from '../controller/order/register'
import { getAllProducts } from '../controller/product/get-products'
import { getAllOrders } from '../controller/order/get'
import { updateProduct } from '../controller/product/update'
import { deleteProduct } from '../controller/product/delete'
import { registerTokenPassword } from '../controller/password/register'
import { recoverPassword } from '../controller/user/recover-password'
import { updateUser } from '../controller/user/update'
import { getAllUsers } from '../controller/user/get'

export async function appRoutes(app: FastifyInstance) {
  app.get('/users', getAllUsers)
  app.post('/users', register)
  app.put('/user/:id', updateUser)

  app.put('/recoverpassword', recoverPassword)
  app.post('/adm', registerAdm)

  app.get('/products', getAllProducts)
  app.post('/product/:adm_id', registerProduct)
  app.put('/product/:id/:adm_id', updateProduct)
  app.delete('/product/:id/:adm_id', deleteProduct)

  app.post('/password', registerTokenPassword)

  app.post('/order/:product_id/:user_id', registerOrder)
  app.get('/orders', getAllOrders)
}
