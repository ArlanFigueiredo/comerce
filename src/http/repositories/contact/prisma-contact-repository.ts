import { Contact, Prisma } from '@prisma/client'
import { ContactRepository } from './contact-repository'
import { prisma } from '@/lib/prisma'

export class PrismaContactRepository implements ContactRepository {
  async findByEmail(email: string): Promise<Contact | null> {
    const contact = await prisma.contact.findFirst({
      where: {
        email,
      },
    })
    return contact
  }

  async findById(id: string): Promise<Contact | null> {
    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
    })
    return contact
  }

  async create(data: Prisma.ContactCreateInput): Promise<Contact> {
    const contact = await prisma.contact.create({
      data,
    })
    return contact
  }
}
