import _ from 'lodash'
import { handleValidationError } from './formErrorHandling'
import { FastifyReply } from 'fastify'
interface RegisterFormErrorHandlingType {
  res: FastifyReply
  name: string
  email: string
  password: string
}

export async function RegisterFormErrorHandling({
  res,
  name,
  email,
  password,
}: RegisterFormErrorHandlingType) {
  if (_.isEmpty(name)) {
    handleValidationError(res, 'O nome do usuario não pode estar vazio')
  }
  if (_.isEmpty(email)) {
    handleValidationError(res, 'O email do usuario não pode estar vazio')
  }
  if (_.isEmpty(password)) {
    handleValidationError(res, 'A senha não pode estar vazio')
  }
  return null
}
