import { transporter } from './index'

interface IEnvSendEmail {
  from: string
  to: string
  subject: string
  text: string
  html: string
}
export class SendingEmail {
  async sedingEmail({
    from,
    to,
    subject,
    text,
    html,
  }: IEnvSendEmail): Promise<void> {
    await transporter
      .sendMail({
        from,
        to,
        subject,
        text,
        html,
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
