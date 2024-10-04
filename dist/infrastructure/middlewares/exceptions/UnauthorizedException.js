"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const BaseException_1 = require("../../exceptions/BaseException");
class UnauthorizedException extends BaseException_1.BaseException {
    constructor(message, customMessage) {
        customMessage = customMessage || "Unauthorized";
        super(message, 401, customMessage);
        this.name = this.constructor.name;
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=UnauthorizedException.js.map