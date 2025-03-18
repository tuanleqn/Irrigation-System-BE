import exp from 'constants'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/messages'
import { LoginReqBody, LogoutReqBody } from '~/models/Requests/user.requests'
import userService from '~/services/users.services'

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const user = req.cookies.user
  const user_id = user.id
  const result = await userService.login(user_id)
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  await userService.logout(req.body.refreshToken)
  res.clearCookie('user')
  return res.json({
    message: USERS_MESSAGES.LOGOUT_SUCCESS
  })
}

export const refreshTokenController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const oldRefreshToken = req.body.refreshToken
  const result = await userService.refreshToken(oldRefreshToken)
  return res.json({
    message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS,
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const result = await userService.register(req.body)
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
