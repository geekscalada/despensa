"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotNullException = void 0;
const BaseException_1 = require("../../infrastructure/exceptions/BaseException");
class NotNullException extends BaseException_1.BaseException {
    constructor(message, emptyColumn) {
        const customMessage = emptyColumn
            ? `El campo ${emptyColumn} no puede estar vacío`
            : "This item cannot be null";
        super(message, 400, customMessage);
    }
}
exports.NotNullException = NotNullException;
//# sourceMappingURL=NotNullException.js.map