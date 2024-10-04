import { User } from "../entities/User";
import { TokenPayload } from "./ITokenPayload";

export interface ITokenService {
  generateAccessToken(user: User): string;
  generateRefreshToken(user: User): string;
  //TODO: change these anys
  validateAccessToken(token: string): TokenPayload | null;
  validateRefreshToken(token: string): TokenPayload | null;
}
