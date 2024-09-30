import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService.ts";
import { UserService } from "../services/UserService.ts";
import { User } from "../entities/User";
import { create } from "domain";
import { InvalidCredentialsException } from "../middlewares/InvalidCredentialsException.ts";
import { InvalidTokenException } from "../middlewares/InvalidTokenException.ts";
import { UserNotFoundException } from "../middlewares/UserNotFoundException.ts";
import { UnauthorizedException } from "../middlewares/UnauthorizedException.ts";

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  // Registro de usuarios

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { nick, email, password } = req.body;

      // Crear nuevo usuario
      const hashedPassword = await this.authService.hashPassword(password);

      const createdUser = await this.userService.registerUser({
        nick,
        email,
        password: hashedPassword,
      });

      // Generar tokens
      const accessToken = this.authService.generateAccessToken(createdUser);
      const refreshToken = this.authService.generateRefreshToken(createdUser);

      return res.status(201).json({ accessToken, refreshToken, createdUser });
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { email, password } = req.body;

    try {
      const user = await this.userService.findByEmail(email);
      if (
        !user ||
        !(await this.authService.comparePasswords(password, user.password))
      ) {
        throw new InvalidCredentialsException("Credenciales inválidas");
      }

      // Generar tokens
      const accessToken = this.authService.generateAccessToken(user);
      const refreshToken = this.authService.generateRefreshToken(user);

      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  //TODO: Front-end could send the refresh token in the body or in a httpOnly cookie
  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { refreshToken } = req.body;

    try {
      const payload = this.authService.validateRefreshToken(refreshToken);
      if (!payload) {
        throw new UnauthorizedException(
          "Token inválido o expirado",
          "Invalid or expired refresh token"
        );
      }

      const user = await this.userService.findById(payload.id);
      if (!user) {
        throw new UserNotFoundException("User not found");
      }

      const newAccessToken = this.authService.generateAccessToken(user);
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  }
}
