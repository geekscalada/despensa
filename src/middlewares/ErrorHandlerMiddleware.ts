import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";
import { AlreadyExistsException } from "../entities/AlreadyExistsException.ts";
import { error } from "console";
import { NotNullException } from "../entities/NotNullException.ts";

export const ErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  function extractKey(text: string): string | string {
    const regex = /\(([^)]+)\)/; // Expresión regular para capturar texto entre paréntesis
    const resultado = text.match(regex);

    if (resultado && resultado[1]) {
      return resultado[1];
    } else {
      return "";
    }
  }

  /**
   * Conflict errors
   */
  if (err instanceof QueryFailedError && err.driverError.code === "23505") {
    const key = extractKey(err.driverError.detail);

    return next(new AlreadyExistsException(err.message, key));
  }

  /**
   * Not null errors
   */
  if (err instanceof QueryFailedError && err.driverError.code === "23502") {
    return next(new NotNullException(err.message, err.driverError.column));
  }

  if (err instanceof QueryFailedError) {
    console.log("Not captured error");
  }

  // Otros errores no manejados
  return res.status(500).json({ message: "Server error" });
};
