import { PrismaClient } from '@prisma/client'

class Database {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async connect(): Promise<void> {
    try {
      await this.prisma.$connect()
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      process.exit(1)
    }
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect()
    console.log('🛑 Database disconnected')
  }

  getClient(): PrismaClient {
    return this.prisma
  }
}

const dbInstance = new Database()

export default dbInstance
