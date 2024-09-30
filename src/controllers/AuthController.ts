import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import { User } from "../entities/User";

import { InvalidCredentialsException } from "../middlewares/InvalidCredentialsException";
import { UserNotFoundException } from "../middlewares/UserNotFoundException";
import { UnauthorizedException } from "../middlewares/UnauthorizedException";

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  // Registro de usuarios

  // TODO: llevar este método al controlador de User
  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      //TODO: checkbody, parse?

      const { nick, email, password } = req.body;

      const createdUser: User = await this.userService.registerUser({
        nick,
        email,
        password,
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
        !(await this.authService.comparePasswords(password, user.password.hash))
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
