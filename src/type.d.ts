import 'express'
import { TokenPayload } from './models/Request/User.requests'

declare module 'express' {
  interface Request {
    decoded_authorization?: TokenPayload
  }
}
