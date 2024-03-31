import { SendingEmail } from './sendingEmail'

interface ServiceSendingEmailRegisterTokenPasswordRequest {
  email: string
  token: string
}

export class ServiceSendingEmailRegisterTokenPassword {
  constructor(private sendingEmail: SendingEmail) {}

  async serviceSendingEmail({
    email,
    token,
  }: ServiceSendingEmailRegisterTokenPasswordRequest): Promise<void> {
    await this.sendingEmail.sedingEmail({
      from: 'arlan.carloz@gmail.com',
      to: email,
      subject: 'Token de recuperação de senha.',
      text: 'Recupere sua senha.',
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
              display: flex;
              justify-content-center: center;
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
          <p>Token de recuperação de senha</p>
          <p><a href=" https://stylus-commerce.netlify.app/${token}" class="button" style="color: #fff;">Recuperar senha</a></p>
          <p>Atenciosamente,<br>Equipe Loja PEN</p>
      </div>
      </body>
      </html>
      `,
    })
  }
}
