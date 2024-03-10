export class UserAlredyExistError extends Error {
  constructor() {
    super('User alredy exists.')
  }
}
