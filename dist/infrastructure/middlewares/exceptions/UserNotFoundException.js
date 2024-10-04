"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
const BaseException_1 = require("../../exceptions/BaseException");
class UserNotFoundException extends BaseException_1.BaseException {
    constructor(message, customMessage) {
        customMessage = customMessage || "User not found";
        super(message, 404, customMessage);
        this.name = this.constructor.name;
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=UserNotFoundException.js.map