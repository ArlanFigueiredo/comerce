import { SendingEmail } from './sendingEmail'

interface ServiceSendingEmailRegisterUserRequest {
  email: string
}

export class ServiceSendingEmailRegisterUser {
  constructor(private sendingEmail: SendingEmail) {}

  async serviceSendingEmail({
    email,
  }: ServiceSendingEmailRegisterUserRequest): Promise<void> {
    await this.sendingEmail.sedingEmail({
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
              background-color: #333;
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
          <h1>Bem-Vindo à STYLUS!</h1>
          <p>Olá,</p>
          <p>Seja bem-vindo à nossa loja! Estamos muito felizes em tê-lo(a) como nosso cliente.</p>
          <p>Aqui na STYLUS, oferecemos um unico produto para atender às suas necessidades de um nicho bem especifico. Fique à vontade para explorar nosso site e descobrir tudo o que temos a oferecer.</p>
          <p>Se tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato conosco. Estamos aqui para ajudar!</p>
          <p>Para começar suas compras, clique no botão abaixo:</p>
          <p><a href="https://stylus-commerce.com.br/glove" class="button" style="color: #fff;">Explorar produtos</a></p>
          <p>Atenciosamente,<br>Equipe Loja STYLUS</p>
      </div>
      </body>
      </html>
      `,
    })
  }
}
