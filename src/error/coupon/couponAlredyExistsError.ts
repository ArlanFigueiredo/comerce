export class CouponAlredyExistsError extends Error {
  constructor() {
    super('Cupom já cadastrado!')
  }
}
