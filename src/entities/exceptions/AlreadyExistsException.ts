import { BaseException } from "../../infrastructure/BaseException.ts";

export class AlreadyExistsException extends BaseException {
  constructor(message: string, key?: string) {
    const customMessage = key
      ? `This ${key} already exists`
      : "This item already exists";
    super(message, 400, customMessage);
    // TODO: we can use this?
    //this.name = this.constructor.name;
  }
}
