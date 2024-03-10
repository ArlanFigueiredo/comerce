export class ProducDoesNotExistsError extends Error {
  constructor() {
    super('Product does not exists.')
  }
}
