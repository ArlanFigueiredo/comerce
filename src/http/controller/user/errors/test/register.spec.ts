import { expect, describe, it } from 'vitest'
import { RegisterFormErrorHandling } from '../register'
import { FastifyReply } from 'fastify'

describe('RegisterFormErrorHandling', () => {
  it('deve retornar status code 400 para dados de formulário inválidos', async () => {
    const statusResponse: FastifyReply = {
      statusCode: 0,
      send() {},
      status(code: number) {
        this.statusCode = code
        return this
      },
    }

    const data = {
      name: '',
      email: 'arlan.carloz@gmail.com',
      password: '123456',
    }

    await RegisterFormErrorHandling({
      res: statusResponse,
      name: data.name,
      email: data.email,
      password: data.password,
    })

    expect(statusResponse.statusCode).toBe(400)
  })

  it('deve retornar status code 400 para dados de formulário inválidos', async () => {
    const statusResponse: FastifyReply = {
      statusCode: 0,
      send() {},
      status(code: number) {
        this.statusCode = code
        return this
      },
    }

    const data = {
      name: 'Arlan Figueiredo',
      email: '',
      password: '123456',
    }

    await RegisterFormErrorHandling({
      res: statusResponse,
      name: data.name,
      email: data.email,
      password: data.password,
    })

    expect(statusResponse.statusCode).toBe(400)
  })

  it('deve retornar status code 400 para dados de formulário inválidos', async () => {
    const statusResponse: FastifyReply = {
      statusCode: 0,
      send() {},
      status(code: number) {
        this.statusCode = code
        return this
      },
    }

    const data = {
      name: 'Arlan Figueiredo',
      email: 'arlan.carloz@gmail.com',
      password: '',
    }

    await RegisterFormErrorHandling({
      res: statusResponse,
      name: data.name,
      email: data.email,
      password: data.password,
    })

    expect(statusResponse.statusCode).toBe(400)
  })

  it('deve retornar null', async (res: FastifyReply) => {
    const result = await RegisterFormErrorHandling({
      res,
      name: 'Arlan',
      email: 'arlan@gmail.com',
      password: '123456',
    })

    expect(result).toBe(null)
  })
})
