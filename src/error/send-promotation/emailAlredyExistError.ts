export class EmailAlredyExistsError extends Error {
  constructor() {
    super('Email ja cadastrado para receber promoções.')
  }
}
