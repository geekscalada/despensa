import { BaseException } from "../infrastructure/BaseException.ts";

export class InvalidCredentialsException extends BaseException {
  constructor(message: string, customMessage?: string) {
    customMessage = customMessage || "Invalid credentials";
    super(message, 401, customMessage);
    this.name = this.constructor.name;
  }
}
