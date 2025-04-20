import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import dbInstance from '~/models/db'
import { hashPassword } from '~/utils/crypto'

class UsersService {
  private async signAccessToken(user_id: string) {
    const member = await dbInstance.getClient().member.findUnique({
      where: {
        id: user_id
      },
      select: {
        role: true
      }
    })

    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        role: member?.role || 'USER'
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN as string, 10)
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN as string, 10)
      }
    })
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }

  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)
    await dbInstance.getClient().member.update({
      where: {
        id: user_id
      },
      data: {
        refreshToken: refresh_token
      }
    })
    return {
      access_token,
      refresh_token
    }
  }

  async register(req_body: any) {
    const user = await dbInstance.getClient().member.create({
      data: {
        email: req_body.email,
        password: hashPassword(req_body.password),
        username: req_body.username || req_body.email.split('@')[0],
        role: req_body.role || 'USER',
        refreshToken: ''
      }
    })
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user.id)
    await dbInstance.getClient().member.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: refresh_token
      }
    })
    return {
      access_token,
      refresh_token
    }
  }
}

const userService = new UsersService()
export default userService
