import jwt from 'jsonwebtoken'
import { UserDocument } from '../model/User'

const config = useRuntimeConfig()
export function generateAccessToken(user: UserDocument) {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    config.jWTSecret,
    { expiresIn: '1h' },
  )
}

export function generateRefreshToken(user: UserDocument) {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    config.refreshSecret,
    { expiresIn: '7d' },
  )
}
