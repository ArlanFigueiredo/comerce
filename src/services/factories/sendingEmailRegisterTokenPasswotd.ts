import { SendingEmail } from '../sendingEmail'
import { ServiceSendingEmailRegisterTokenPassword } from '../sendingEmailRegisterTokenPassword'

export function factorieServiceSendingEmailRegisterTokenPassword() {
  const sendingEmail = new SendingEmail()
  const sendingEmailRegisterTokenPassword =
    new ServiceSendingEmailRegisterTokenPassword(sendingEmail)
  return sendingEmailRegisterTokenPassword
}
