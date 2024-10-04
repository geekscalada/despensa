import { BaseException } from "../../infrastructure/exceptions/BaseException";

export class AlreadyExistsException extends BaseException {
  constructor(message: string, key?: string) {
    const customMessage = key
      ? `This ${key} already exists`
      : "This item already exists";
    super(message, 400, customMessage);
  }
}
