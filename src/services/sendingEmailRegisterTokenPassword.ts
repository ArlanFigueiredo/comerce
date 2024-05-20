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
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email de Boas-Vindas</title>
          <style>
            /* Estilos gerais */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              text-align: center;
              font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
              color: #333;
              text-align: center;
              font-weight: 100;
            }
            h4 {
              font-size: 20px;
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
            .message-alert {
              color: red;
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
            <h1>Recuperar senha</h1>
            <h2>Olá, abaixo você encontra o token de recuperação de senha</h2>
            <p class="message-alert">
              Evite o compartilhamento de dados com terceiros.
            </p>
            <h4>${token}</h4>
            <p>Basta copiar o token acima, clicar no link abaixo informando o token e a nova senha.</p>
            <p>
              <a
                href=" https://stylus-commerce.com.br/recoverpassword"
                class="button"
                style="color: #fff"
                >Recuperar senha</a
              >
            </p>
            <p>Atenciosamente,<br />Equipe STYLUS</p>
          </div>
        </body>
      </html>
      `,
    })
  }
}
