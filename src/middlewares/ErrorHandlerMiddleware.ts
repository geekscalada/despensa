import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";
import { AlreadyExistsException } from "../entities/AlreadyExistsException.ts";
import { error } from "console";
import { NotNullException } from "../entities/exceptions/NotNullException.ts";
import { UnauthorizedException } from "./UnauthorizedException.ts";
import { InvalidTokenException } from "./InvalidTokenException.ts";
import { InvalidCredentialsException } from "./InvalidCredentialsException.ts";

//TODO: ¿Try to use something like switch case to force to use all the cases and avoid to forget one?

export const ErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  //TODO: remove this ifs to just use a unique line
  /**
   * Unauthorized errors
   */
  if (err instanceof UnauthorizedException) {
    return res.status(err.statusCode).json({ message: err.customMessage });
  }

  if (err instanceof InvalidTokenException) {
    return res.status(err.statusCode).json({ message: err.customMessage });
  }

  if (err instanceof InvalidCredentialsException) {
    return res.status(err.statusCode).json({ message: err.customMessage });
  }

  // Otros errores no manejados
  return res.status(500).json({ message: "Server error" });
};

function extractKey(text: string): string | string {
  const regex = /\(([^)]+)\)/; // Expresión regular para capturar texto entre paréntesis
  const resultado = text.match(regex);

  if (resultado && resultado[1]) {
    return resultado[1];
  } else {
    return "";
  }
}
