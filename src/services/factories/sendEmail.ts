import { EnvSendEmail } from '../sendEmail'
export function factorieSendEmail() {
  const sendEmail = new EnvSendEmail()
  return sendEmail
}
