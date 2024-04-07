import { FastifyReply } from 'fastify'

export function handleValidationError(res: FastifyReply, errorMessage: string) {
  return res.status(400).send({ message: errorMessage })
}
