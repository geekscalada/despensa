"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenException = void 0;
const BaseException_1 = require("../../exceptions/BaseException");
class InvalidTokenException extends BaseException_1.BaseException {
    constructor(message, customMessage) {
        customMessage = customMessage || "Invalid token";
        super(message, 403, customMessage);
    }
}
exports.InvalidTokenException = InvalidTokenException;
//# sourceMappingURL=InvalidTokenException.js.map