import { Request, Response, NextFunction } from "express";
import { AlreadyExistsException } from "../entities/exceptions/AlreadyExistsException.ts";
import { ValidationError } from "class-validator";
import { Not } from "typeorm";
import { NotNullException } from "../entities/exceptions/NotNullException.ts";

export const TypeORMErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AlreadyExistsException) {
    return res.status(err.statusCode).json({ message: err.customMessage });
  }

  if (err instanceof NotNullException) {
    return res.status(err.statusCode).json({ message: err.customMessage });
  }

  // Otros errores no manejados
  //return res.status(500).json({ message: "Server error" });
};
