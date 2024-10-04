import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";
import { AlreadyExistsException } from "../../app/exceptions/AlreadyExistsException";
import { error } from "console";
import { NotNullException } from "../../app/exceptions/NotNullException";
import { UnauthorizedException } from "./exceptions/UnauthorizedException";
import { InvalidTokenException } from "./exceptions/InvalidTokenException";
import { InvalidCredentialsException } from "./exceptions/InvalidCredentialsException";
import { ValidationException } from "../../app/exceptions/ValidationException";

export const ErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //TODO: to add more direverError.code
  /**
   * TYPEORM exceptions captured by another TypeORMMiddleware
   */

  // Conflict
  if (err instanceof QueryFailedError && err.driverError.code === "23505") {
    const key = extractKey(err.driverError.detail);

    return next(new AlreadyExistsException(err.message, key));
  }

  // Not null errors
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

  if (err instanceof ValidationException) {
    return res.status(err.statusCode).json({ message: err.customMessage });
  }

  // Otros errores no manejados
  console.log(err);
  return res.status(500).json({ message: "Server error" });
};

function extractKey(text: string): string | string {
  const regex = /\(([^)]+)\)/; // Expresión regular para capturar texto entre paréntesis
  const result = text.match(regex);

  if (result && result[1]) {
    return result[1];
  } else {
    return "";
  }
}
