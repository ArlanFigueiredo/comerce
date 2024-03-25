import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes/routes'
import { fastifyCookie } from '@fastify/cookie'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'
export const app = fastify()

app.register(cors)
app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(appRoutes)

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }
  if (error instanceof PrismaClientKnownRequestError) {
    return res.status(400).send({
      message: 'Validation Error',
      issues: error.message,
    })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return res.status(500).send({
    message: 'Internal server error',
  })
})
