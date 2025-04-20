import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import dbInstance from './models/db'
import usersRouter from './routes/users.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../swagger/swagger'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { initMQTT } from './services/mqtt.service'
import path from 'path'
import sensorsRouter from './routes/sensor.routes'
import devicesRouter from './routes/device.routes'

const app = express()
const server = http.createServer(app)
app.use(express.json())
app.use(cors())
// app.use(express.static('public'))
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

//! Routes
//* Redirect root URL to /api-docs
app.get('/', (req, res) => {
  res.redirect('/api-docs')
})
app.get('/ui', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/ui.html'))
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/users', usersRouter)
app.use('/sensors', sensorsRouter)
app.use('/devices', devicesRouter)

//! MQTT
const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } })
initMQTT(io)

//! Database connection
dbInstance.connect().then(() => {
  console.log('✅ Database connected successfully')
})
process.on('SIGINT', async () => {
  await dbInstance.disconnect()
  process.exit(0)
})

server.listen(process.env.BE_PORT, () => {
  console.log(`Server is running on port ${process.env.BE_PORT}`)
  console.log(`Access the local server at http://localhost:${process.env.BE_PORT}`)
  console.log(`Or the network server at https://irrigation-system-be.onrender.com`)
})
