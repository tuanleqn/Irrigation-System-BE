import Router from 'express'
import { loginController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const usersRouter = Router()

usersRouter.get('/', (req, res) => {
  res.send('Hello from users router')
})

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

export default usersRouter
