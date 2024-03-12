export class TokenDoesNotExistsError extends Error {
  constructor() {
    super('Token does not exist.')
  }
}
