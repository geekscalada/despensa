import { BaseException } from "../../exceptions/BaseException";

export class InvalidCredentialsException extends BaseException {
  constructor(message: string, customMessage?: string) {
    customMessage = customMessage || "Invalid credentials";
    super(message, 401, customMessage);
  }
}
