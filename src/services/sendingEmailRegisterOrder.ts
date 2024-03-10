import { SendingEmail } from './sendingEmail'

interface ServiceSendingEmailRegisterOrderRequest {
  email: string
  name_product: string
  quantity_product: number
  unit_price: number
}

export class ServiceSendingEmailRegisterOrder {
  constructor(private sendingEmail: SendingEmail) {}

  async serviceSendingEmail({
    email,
    name_product,
    quantity_product,
    unit_price,
  }: ServiceSendingEmailRegisterOrderRequest): Promise<void> {
    await this.sendingEmail.sedingEmail({
      from: 'arlan.carloz@gmail.com',
      to: email,
      subject: 'Pedido de compra',
      text: 'Vimos que você acabou de gerar um pedido!',
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
          <h1>Pedido gerado com sucesso!</h1>
          <p>Olá, caso ainda não tenha pago, faça o pagamento do seu pedido para não perder a oportunidade</p>
          <p>Nome do produto: ${name_product}</p>
          <p>Preço da unidade: ${unit_price}</p>
          <p>Quantidade: ${quantity_product}</p>
          <p>Valor total: ${quantity_product * unit_price}</p>
          <img width="200px" src="https://cdn.pixabay.com/photo/2012/04/13/18/44/pen-33237_1280.png" alt="">
          <p><a href="#" class="button" style="color: #fff;">Explorar outros Produtos</a></p>
          <p>Atenciosamente,<br>Equipe Loja PEN</p>
      </div>
      </body>
      </html>
      `,
    })
  }
}
