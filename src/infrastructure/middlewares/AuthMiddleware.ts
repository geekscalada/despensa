import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../app/services/AuthService";
import { User } from "../../domain/entities/User";
import { UnauthorizedException } from "./exceptions/UnauthorizedException";
import { InvalidTokenException } from "./exceptions/InvalidTokenException";

interface AuthenticatedRequest extends Request {
  user?: Partial<User>;
}

export const AuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthorizedException("User doesn't have token");
  }

  const authService = new AuthService();
  const payload = authService.validateAccessToken(token);

  if (!payload) {
    throw new InvalidTokenException(
      "Token inválido o expirado",
      "Token inválido o expirado"
    );
  }

  req.user = payload;
  next();
};
