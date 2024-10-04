"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
class BaseException extends Error {
    statusCode;
    customMessage;
    constructor(message, statusCode, customMessage) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.customMessage = customMessage || null;
        // Aquí capturamos la traza de la pila (stack trace) sin incluir la excepción base
        // para tener un stack trace más limpio
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BaseException = BaseException;
//# sourceMappingURL=BaseException.js.map