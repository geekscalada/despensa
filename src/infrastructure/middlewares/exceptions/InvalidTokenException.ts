import { BaseException } from "../../exceptions/BaseException";

export class InvalidTokenException extends BaseException {
  constructor(message: string, customMessage?: string) {
    customMessage = customMessage || "Invalid token";
    super(message, 403, customMessage);
  }
}
