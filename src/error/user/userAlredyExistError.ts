export class UserAlredyExistError extends Error {
  constructor() {
    // super('User alredy exists.')
    super('Usuario já existe.')
  }
}
