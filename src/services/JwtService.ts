import { User } from "../entities/User";
import { TokenPayload } from "./ITokenPayload";
import { ITokenService } from "./ITokenService";
import jwt from "jsonwebtoken";

export class JwtService implements ITokenService {
  generateAccessToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, nick: user.nick },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }

  generateRefreshToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, nick: user.nick },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );
  }

  validateAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as TokenPayload;
    } catch (err) {
      return null;
    }
  }
}
