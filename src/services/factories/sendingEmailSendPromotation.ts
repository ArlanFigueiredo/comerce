import { ServiceSendingEmailSendPromotation } from '../sendEmailSendPromotation'
import { SendingEmail } from '../sendingEmail'

export function factorieServiceSendingEmailSendPromotation() {
  const sendingEmail = new SendingEmail()
  const sendingEmailSendPromotation = new ServiceSendingEmailSendPromotation(
    sendingEmail,
  )
  return sendingEmailSendPromotation
}
