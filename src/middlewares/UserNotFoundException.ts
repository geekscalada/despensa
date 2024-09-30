import { BaseException } from "../infrastructure/BaseException";

export class UserNotFoundException extends BaseException {
  constructor(message: string, customMessage?: string) {
    customMessage = customMessage || "User not found";
    super(message, 404, customMessage);
    this.name = this.constructor.name;
  }
}
