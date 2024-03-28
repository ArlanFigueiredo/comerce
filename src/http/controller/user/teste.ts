import { PrismaUserRepository } from '@/http/repositories/user/prisma-user-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAll(req: FastifyRequest, res: FastifyReply) {
  const userRepository = new PrismaUserRepository()

  const getSchemaBody = z.object({
    listEmails: z.string().array(),
  })

  const { listEmails } = getSchemaBody.parse(req.body)

  console.log(listEmails)
  // const listEmail = [
  //   'arlansfg@gmail.com',
  //   'example@example.com',
  //   'example1@example.com',
  // ]

  const emails = await userRepository.findAllUsersByEmail(listEmails)

  res.status(200).send({
    emails,
  })
}
