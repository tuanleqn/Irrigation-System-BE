import Router from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const usersRouter = Router()

usersRouter.get('/', (req, res) => {
  res.send('Hello from users router')
})

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and return access & refresh tokens
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refresh_token:
 *                   type: string
 *                   example: "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               username:
 *                 type: string
 *                 example: "abc"
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 example: "USER"
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refresh_token:
 *                   type: string
 *                   example: "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default usersRouter
