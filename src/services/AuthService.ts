import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../entities/User";
import { AppDataSource } from "../infrastructure/config/database";
import { Password } from "../entities/Password";

// TODO: generar una interfaz que envuelva a jwt para que sea más cambiable?
// TODO: generar una interfaz del servicio AuthService

export class AuthService {
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

  validateAccessToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch (err) {
      return null;
    }
  }

  async hashPassword(password: Password): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password.hash, salt);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
