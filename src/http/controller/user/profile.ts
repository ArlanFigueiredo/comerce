import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { GetUserProfileUserUseCase } from '@/http/use-cases/user/get-user-profile'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const getUserProfile = new GetUserProfileUserUseCase(
    new PrismaUserRepository(),
  )
  const { user } = await getUserProfile.execute({
    userId: req.user.sub,
  })
  return res.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
    status: true,
  })
}
