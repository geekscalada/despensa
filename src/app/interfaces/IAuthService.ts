import { User } from "../../domain/entities/User";
import { TokenPayload } from "../../DTOs/ITokenPayload";

export interface IAuthService {
  generateAccessToken(user: User): string;
  generateRefreshToken(user: User): string;
  validateAccessToken(token: string): TokenPayload | null;
  validateRefreshToken(token: string): TokenPayload | null;
  hashPassword(password: string): Promise<string>;
  comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
}
