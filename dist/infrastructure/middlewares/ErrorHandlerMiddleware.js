"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const typeorm_1 = require("typeorm");
const AlreadyExistsException_1 = require("../../app/exceptions/AlreadyExistsException");
const NotNullException_1 = require("../../app/exceptions/NotNullException");
const UnauthorizedException_1 = require("./exceptions/UnauthorizedException");
const InvalidTokenException_1 = require("./exceptions/InvalidTokenException");
const InvalidCredentialsException_1 = require("./exceptions/InvalidCredentialsException");
const ValidationException_1 = require("../../app/exceptions/ValidationException");
const ErrorHandlerMiddleware = (err, req, res, next) => {
    //TODO: to add more direverError.code
    /**
     * TYPEORM exceptions captured by another TypeORMMiddleware
     */
    // Conflict
    if (err instanceof typeorm_1.QueryFailedError && err.driverError.code === "23505") {
        const key = extractKey(err.driverError.detail);
        return next(new AlreadyExistsException_1.AlreadyExistsException(err.message, key));
    }
    // Not null errors
    if (err instanceof typeorm_1.QueryFailedError && err.driverError.code === "23502") {
        return next(new NotNullException_1.NotNullException(err.message, err.driverError.column));
    }
    if (err instanceof typeorm_1.QueryFailedError) {
        console.log("Not captured error");
    }
    //TODO: remove this ifs to just use a unique line
    /**
     * Unauthorized errors
     */
    if (err instanceof UnauthorizedException_1.UnauthorizedException) {
        return res.status(err.statusCode).json({ message: err.customMessage });
    }
    if (err instanceof InvalidTokenException_1.InvalidTokenException) {
        return res.status(err.statusCode).json({ message: err.customMessage });
    }
    if (err instanceof InvalidCredentialsException_1.InvalidCredentialsException) {
        return res.status(err.statusCode).json({ message: err.customMessage });
    }
    if (err instanceof ValidationException_1.ValidationException) {
        return res.status(err.statusCode).json({ message: err.customMessage });
    }
    // Otros errores no manejados
    console.log(err);
    return res.status(500).json({ message: "Server error" });
};
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
function extractKey(text) {
    const regex = /\(([^)]+)\)/; // Expresión regular para capturar texto entre paréntesis
    const result = text.match(regex);
    if (result && result[1]) {
        return result[1];
    }
    else {
        return "";
    }
}
//# sourceMappingURL=ErrorHandlerMiddleware.js.map