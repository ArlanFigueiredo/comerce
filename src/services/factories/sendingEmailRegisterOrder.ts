import { SendingEmail } from '../sendingEmail'
import { ServiceSendingEmailRegisterOrder } from '../sendingEmailRegisterOrder'

export function factorieServiceSendingEmailRegisterOrder() {
  const sendingEmail = new SendingEmail()
  const sendingEmailRegisterOder = new ServiceSendingEmailRegisterOrder(
    sendingEmail,
  )
  return sendingEmailRegisterOder
}
