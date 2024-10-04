// src/controllers/UserController.ts
import { NextFunction, Request, Response } from "express";
import { UserService } from "../app/services/UserService";

import { AuthService } from "../app/services/AuthService";
import { User } from "../domain/entities/User";
import { InvalidCredentialsException } from "../infrastructure/middlewares/exceptions/InvalidCredentialsException";
import { IUserController } from "./IUserController";

export class UserController implements IUserController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { nick, email, password } = req.body;

      const createdUser: User = await this.userService.registerUser({
        nick,
        email,
        password,
      });

      // Generar tokens
      const accessToken = this.authService.generateAccessToken(createdUser);
      const refreshToken = this.authService.generateRefreshToken(createdUser);

      return res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    console.log(req.body);

    const { email, password } = req.body;

    try {
      const user = await this.userService.findByEmail(email, ["password"]);
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
}
