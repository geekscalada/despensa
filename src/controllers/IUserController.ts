import { NextFunction, Request, Response } from "express";

export interface IUserController {
  registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
  login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
