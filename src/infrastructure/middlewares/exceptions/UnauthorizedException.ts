import { BaseException } from "../../exceptions/BaseException";

export class UnauthorizedException extends BaseException {
  constructor(message: string, customMessage?: string) {
    customMessage = customMessage || "Unauthorized";
    super(message, 401, customMessage);
    this.name = this.constructor.name;
  }
}
