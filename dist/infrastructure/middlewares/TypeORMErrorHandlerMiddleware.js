"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMErrorHandlerMiddleware = void 0;
const AlreadyExistsException_1 = require("../../app/exceptions/AlreadyExistsException");
const NotNullException_1 = require("../../app/exceptions/NotNullException");
const TypeORMErrorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof AlreadyExistsException_1.AlreadyExistsException) {
        return res.status(err.statusCode).json({ message: err.customMessage });
    }
    if (err instanceof NotNullException_1.NotNullException) {
        return res.status(err.statusCode).json({ message: err.customMessage });
    }
    // Otros errores no manejados
    //return res.status(500).json({ message: "Server error" });
};
exports.TypeORMErrorHandlerMiddleware = TypeORMErrorHandlerMiddleware;
//# sourceMappingURL=TypeORMErrorHandlerMiddleware.js.map