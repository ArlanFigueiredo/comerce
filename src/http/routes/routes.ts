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
import { authenticateUser } from '../controller/user/authenticate'
import { profile } from '../controller/user/profile'
import { verifyJWT } from '../controller/middleware/verify-jwt'
import { refresh } from '../controller/user/refersh'

export async function appRoutes(app: FastifyInstance) {
  app.get('/users', getAllUsers)
  app.post('/users', register)
  app.put('/user/:id', { onRequest: [verifyJWT] }, updateUser)
  app.post('/authenticate', authenticateUser)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.patch('/token/refresh', refresh)

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
