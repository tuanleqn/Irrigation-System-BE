import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import dbInstance from '~/models/db'

class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN as string, 10)
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
}

const userService = new UsersService()
export default userService
