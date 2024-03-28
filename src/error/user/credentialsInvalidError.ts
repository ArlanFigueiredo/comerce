export class InvalidCredentialsError extends Error {
  constructor() {
    // super('Credentials Invalid.')
    super('Email ou senha estão incorretos')
  }
}
