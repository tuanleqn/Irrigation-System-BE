import Router from 'express'
import {
  loginController,
  logoutController,
  registerController,
  refreshTokenController
} from '~/controllers/users.controllers'
import { loginValidator, refreshTokenValidator, registerValidator } from '~/middlewares/users.middlewares'
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

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: User logout
 *     description: Invalidate the refresh token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout success"
 */
usersRouter.post('/logout', refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * @swagger
 * /users/refresh-token:
 *  post:
 *   summary: Refresh access token
 *   description: Generate a new access token using the refresh token
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          required:
 *            - refreshToken
 *          properties:
 *            refreshToken:
 *              type: string
 *              example: "your_refresh_token_here"
 *   responses:
 *    200:
 *      description: New access token and refresh token generated
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              access_token:
 *                type: string
 *                example: "new_access_token_here"
 *              refresh_token:
 *                type: string
 *                example: "new_refresh_token_here"
 */

usersRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

export default usersRouter
