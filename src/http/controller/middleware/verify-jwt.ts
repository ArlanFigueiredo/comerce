import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(req: FastifyRequest, res: FastifyReply) {
  try {
    const security = await req.jwtVerify()
    console.log(security)
  } catch (error) {
    return res.status(401).send({
      message: 'Unauthorized',
    })
  }
}
