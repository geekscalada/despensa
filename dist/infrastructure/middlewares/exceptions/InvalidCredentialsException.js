"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsException = void 0;
const BaseException_1 = require("../../exceptions/BaseException");
class InvalidCredentialsException extends BaseException_1.BaseException {
    constructor(message, customMessage) {
        customMessage = customMessage || "Invalid credentials";
        super(message, 401, customMessage);
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
//# sourceMappingURL=InvalidCredentialsException.js.map