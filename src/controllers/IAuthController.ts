import { NextFunction, Request, Response } from "express";

export interface IAuthController {
  refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
