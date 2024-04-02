export class CouponDoesNotExistsError extends Error {
  constructor() {
    super('Cupom não existe.')
    this.name = 'CouponDoesNotExistsError'
  }
}
