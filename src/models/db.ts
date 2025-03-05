import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function connectDB() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  }
}

connectDB()

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  console.log('🛑 Database disconnected')
  process.exit(0)
})

export default prisma
