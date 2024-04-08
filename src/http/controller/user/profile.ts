import { factorieGetUserProfileUseCase } from '@/http/use-cases/user/factories/get-user-profile'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const getUserProfileUserUseCase = factorieGetUserProfileUseCase()

  const { user } = await getUserProfileUserUseCase.execute({
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
