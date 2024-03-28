import { SendingEmail } from './sendingEmail'

export class ServiceSendingEmailSendPromotation {
  constructor(private sendingEmail: SendingEmail) {}

  async serviceSendingEmail(email: string): Promise<void> {
    await this.sendingEmail.sedingEmail({
      from: 'arlan.carloz@gmail.com',
      to: email,
      subject: 'Agora você irá ficar por dentro de todas as promoções',
      text: 'Fique ligado!',
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
          <h1>Só aqui na STYLUS você encontra</h1>
          <p></p>
          <p>Token de recuperação de senha</p>
          <p><a href="#" class="button" style="color: #fff;">Clique aqui para ver os produtos</a></p>
          <p>Atenciosamente,<br>Equipe STYLUS</p>
      </div>
      </body>
      </html>
      `,
    })
  }
}
