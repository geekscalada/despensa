import { Request, Response, NextFunction } from "express";
import { AlreadyExistsException } from "../entities/exceptions/AlreadyExistsException";

import { NotNullException } from "../entities/exceptions/NotNullException";

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
