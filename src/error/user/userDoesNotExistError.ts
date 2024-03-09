export class UserDoesNotExistError extends Error {
  constructor() {
    super('User does not exists.')
  }
}
