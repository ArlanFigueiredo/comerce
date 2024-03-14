export class ProductDoesNotExistsError extends Error {
  constructor() {
    super('Product does not exists.')
  }
}
