import { ValidationError } from "class-validator";
import { BaseException } from "../../infrastructure/BaseException";

export class ValidationException extends BaseException {
  constructor(message: string, errors: ValidationError[]) {
    // Mover la lógica de extracción del mensaje a una variable temporal
    const customMessage =
      ValidationException.extractMessageFromText(
        JSON.stringify(errors[0].constraints)
      ) || "Invalid body";

    // Llamar a super primero
    super(message, 404, customMessage);
    this.name = this.constructor.name;
  }

  // Hacer el método estático para evitar el uso de `this` antes de super()
  private static extractMessageFromText(text: string): string | null {
    const pattern = /{[^}]*:\s*"([^"]*)"}/;

    const match = text.match(pattern);

    return match ? match[1] : null;
  }
}
