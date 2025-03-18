import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

export interface LoginReqBody {
  email: string
  password: string
}

export interface LogoutReqBody {
  refreshToken: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}
