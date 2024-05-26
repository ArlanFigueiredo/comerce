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
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
      }
      p {
        color: #666;
        font-size: 16px;
        line-height: 1.6;
      }
      .button {
        display: flex;
        justify-content: center;
        display: inline-block;
        padding: 10px 20px;
        background-color: #333;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      }
      .coupom1 {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        gap: 20px;
      }
      .coupom1 .c1 {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 40px;
        border-radius: 5px;
        font-size: 18px;
        background-color: #333;
        color: #fff;
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
      <h2>Só aqui na STYLUS você encontra as melhores promoções</h2>
      <h3>Aproveite nossos cupons abaixo:</h3>
      <br /><br />
      <div class="coupom1">
        <div class="c1">
          <h4>MAIO5</h4>
        </div>
        <h3>Para R$5,00 reais de desconto</h3>
      </div>
      <br />
      <br />
      <br />
      <div class="coupom1">
        <div class="c1">
          <h4>MAIO25</h4>
        </div>
        <h3>Para R$25% de desconto</h3>
      </div>
      <br />
      <br />
      <p>
        <a href="http://localhost:3000/glove" class="button" style="color: #fff"
          >Clique aqui para ver o produto</a
        >
      </p>
      <h3>Atenciosamente,<br />Equipe STYLUS</h3>
    </div>
  </body>
</html>

      `,
    })
  }
}
