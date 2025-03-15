import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import dbInstance from './models/db'
import usersRouter from './routes/users.routes'

const app = express()
app.use(express.json())

dbInstance.connect()
process.on('SIGINT', async () => {
  await dbInstance.disconnect()
  process.exit(0)
})

//! Routes
app.use('/users', usersRouter)

app.listen(process.env.BE_PORT, () => {
  console.log(`Server is running on port ${process.env.BE_PORT}
Access the server at http://localhost:${process.env.BE_PORT}`)
})
