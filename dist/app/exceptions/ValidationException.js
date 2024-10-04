"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const BaseException_1 = require("../../infrastructure/exceptions/BaseException");
class ValidationException extends BaseException_1.BaseException {
    constructor(message, errors) {
        // Mover la lógica de extracción del mensaje a una variable temporal
        const customMessage = ValidationException.extractMessageFromText(JSON.stringify(errors[0].constraints)) || "Invalid body";
        // Llamar a super primero
        super(message, 404, customMessage);
        this.name = this.constructor.name;
    }
    // Hacer el método estático para evitar el uso de `this` antes de super()
    static extractMessageFromText(text) {
        const pattern = /{[^}]*:\s*"([^"]*)"}/;
        const match = text.match(pattern);
        return match ? match[1] : null;
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map