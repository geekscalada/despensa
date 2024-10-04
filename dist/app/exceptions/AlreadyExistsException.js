"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistsException = void 0;
const BaseException_1 = require("../../infrastructure/exceptions/BaseException");
class AlreadyExistsException extends BaseException_1.BaseException {
    constructor(message, key) {
        const customMessage = key
            ? `This ${key} already exists`
            : "This item already exists";
        super(message, 400, customMessage);
    }
}
exports.AlreadyExistsException = AlreadyExistsException;
//# sourceMappingURL=AlreadyExistsException.js.map