export class ProductAlredyExistError extends Error {
  constructor() {
    super('Product alredy exist.')
  }
}
