import { UserAlredyExistError } from '@/error/user/userAlredyExistError'
import { registerUserFactorie } from '@/http/use-cases/user/factories/register'
import { factorieSendEmail } from '@/services/factories/sendEmail'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const factorieUserRegister = registerUserFactorie()
  const registerSendEmail = factorieSendEmail()

  const registerBodySchema = z.object({
    name: z.coerce.string(),
    email: z.coerce.string().email(),
    password: z.coerce.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    await factorieUserRegister.execute({
      name,
      email,
      password,
    })
    await registerSendEmail.envSendEmail({
      from: 'arlan.carloz@gmail.com',
      to: email,
      subject: 'User created successfully',
      text: 'Seja bem vindo a PEN',
      html: `
      
      <!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email de Boas-Vindas</title>
<style>
    /* Estilos gerais */
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h1 {
        color: #333;
        text-align: center;
    }
    p {
        color: #666;
        font-size: 16px;
        line-height: 1.6;
    }
    .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
    }
    /* Estilos específicos para dispositivos móveis */
    @media screen and (max-width: 600px) {
        .container {
            width: 100%;
            border-radius: 0;
        }
    }
</style>
</head>
<body>
<div class="container">
    <h1>Bem-Vindo à Loja PEN!</h1>
    <p>Olá,</p>
    <p>Seja bem-vindo à nossa loja! Estamos muito felizes em tê-lo(a) como nosso cliente.</p>
    <p>Aqui na Loja PEN, oferecemos uma grande variedade de produtos para atender às suas necessidades. Fique à vontade para explorar nosso site e descobrir tudo o que temos a oferecer.</p>
    <p>Se tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato conosco. Estamos aqui para ajudar!</p>
    <p>Para começar suas compras, clique no botão abaixo:</p>
    <p><a href="#" class="button" style="color: #fff;">Explorar Produtos</a></p>
    <p>Atenciosamente,<br>Equipe Loja PEN</p>
</div>
</body>
</html>
      `,
    })
    return res.status(200).send({
      message: 'User created successfully!',
    })
  } catch (error) {
    if (error instanceof UserAlredyExistError) {
      return res.status(409).send({
        message: error.message,
      })
    }
    return res.status(500).send()
  }
}
