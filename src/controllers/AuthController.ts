import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import { User } from "../entities/User";

import { InvalidCredentialsException } from "../middlewares/exceptions/InvalidCredentialsException";
import { UserNotFoundException } from "../middlewares/exceptions/UserNotFoundException";
import { UnauthorizedException } from "../middlewares/exceptions/UnauthorizedException";
import { IAuthController } from "./IAuthController";

export class AuthController implements IAuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
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
