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
          <h1>Pedido gerado com sucesso!</h1>
          <h2>Olá, caso ainda não tenha pago, faça o pagamento do seu pedido para não perder a oportunidade</h2>
          <h3>Nome do produto: ${name_product}</h3>
          <h3>Preço da unidade: R$${unit_price},00</h3>
          <h3>Quantidade: ${quantity_product}</h3>
          <h3>Valor total: R$${quantity_product * unit_price},00</h3>
          <img width="200px" src="https://http2.mlstatic.com/D_NQ_NP_798672-MLU75886717409_042024-O.webp" alt="">
          <h4><a href="https://stylus-commerce.com.br/glove" class="button" style="color: #fff;">Explorar outros Produtos</a></h4>
          <br/>
          <h4>Atenciosamente,<br>Equipe Loja STYLUS</h4>
      </div>
      </body>
      </html>
      `,
    })
  }
}
