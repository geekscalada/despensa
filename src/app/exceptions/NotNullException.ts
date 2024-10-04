import { BaseException } from "../../infrastructure/exceptions/BaseException";

export class NotNullException extends BaseException {
  constructor(message: string, emptyColumn?: string) {
    const customMessage = emptyColumn
      ? `El campo ${emptyColumn} no puede estar vacío`
      : "This item cannot be null";
    super(message, 400, customMessage);
  }
}
