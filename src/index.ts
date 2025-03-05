import express from 'express'
import routes from './routes'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())

routes(app)

app.listen(process.env.BE_PORT, () => {
  console.log('Server is running on port ' + process.env.BE_PORT)
})
