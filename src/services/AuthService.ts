import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../entities/User";
import { IAuthService } from "./IAuthService";
import { ITokenService } from "./ITokenService";
import { IPasswordService } from "./IPassWordService";
import { JwtService } from "./JwtService";
import { BcryptPasswordService } from "./BcryptPasswordService";
import { TokenPayload } from "./ITokenPayload";

export class AuthService implements IAuthService {
  private tokenService: ITokenService;
  private passwordService: IPasswordService;

  constructor() {
    this.tokenService = new JwtService();
    this.passwordService = new BcryptPasswordService();
  }

  generateAccessToken(user: User): string {
    return this.tokenService.generateAccessToken(user);
  }

  generateRefreshToken(user: User): string {
    return this.tokenService.generateRefreshToken(user);
  }

  validateAccessToken(token: string): TokenPayload | null {
    return this.tokenService.validateAccessToken(token);
  }

  validateRefreshToken(token: string): TokenPayload | null {
    return this.tokenService.validateRefreshToken(token);
  }

  async hashPassword(password: string): Promise<string> {
    return await this.passwordService.hashPassword(password);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await this.passwordService.comparePasswords(
      password,
      hashedPassword
    );
  }
}
