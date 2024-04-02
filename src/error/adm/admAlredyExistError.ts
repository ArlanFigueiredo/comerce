export class AdmAlredyExistsError extends Error {
  constructor() {
    super('Adm alredy exists.')
    this.name = 'AdmAlredyExistsError'
  }
}
