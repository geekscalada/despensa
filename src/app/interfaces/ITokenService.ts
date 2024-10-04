import { User } from "../../domain/entities/User";
import { TokenPayload } from "../../DTOs/ITokenPayload";

export interface ITokenService {
  generateAccessToken(user: User): string;
  generateRefreshToken(user: User): string;
  //TODO: change these anys
  validateAccessToken(token: string): TokenPayload | null;
  validateRefreshToken(token: string): TokenPayload | null;
}
