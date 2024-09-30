import { BaseException } from "../infrastructure/BaseException.ts";

export class InvalidTokenException extends BaseException {
  constructor(message: string, customMessage?: string) {
    customMessage = customMessage || "Invalid token";
    super(message, 403, customMessage);
    this.name = this.constructor.name;
  }
}
