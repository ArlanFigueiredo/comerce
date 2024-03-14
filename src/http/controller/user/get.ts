import { factorieGetUser } from '@/http/use-cases/user/factories/get'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllUsers(req: FastifyRequest, res: FastifyReply) {
  const getUserFactory = factorieGetUser()

  try {
    const user = await getUserFactory.execute()
    return res.status(201).send({
      user,
    })
  } catch (error) {
    return res.status(500).send({
      error,
    })
  }
}
