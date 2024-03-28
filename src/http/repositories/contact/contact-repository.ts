import { Contact, Prisma } from '@prisma/client'

export interface ContactRepository {
  findById(id: string): Promise<Contact | null>
  findByEmail(email: string): Promise<Contact | null>
  create(data: Prisma.ContactCreateInput): Promise<Contact>
}
