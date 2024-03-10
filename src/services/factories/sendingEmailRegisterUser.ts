import { SendingEmail } from '../sendingEmail'
import { ServiceSendingEmailRegisterUser } from '../sendingEmailRegisterUser'

export function factorieServiceSendingEmailRegisterUser() {
  const sendingEmail = new SendingEmail()
  const sendingEmailRegisterUser = new ServiceSendingEmailRegisterUser(
    sendingEmail,
  )
  return sendingEmailRegisterUser
}
