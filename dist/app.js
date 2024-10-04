"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const { json } = body_parser_1.default;
const authRoutes_1 = __importDefault(require("./app/interfaces/routes/authRoutes"));
const ErrorHandlerMiddleware_1 = require("./infrastructure/middlewares/ErrorHandlerMiddleware");
const TypeORMErrorHandlerMiddleware_1 = require("./infrastructure/middlewares/TypeORMErrorHandlerMiddleware");
// Inicializar Express
const app = (0, express_1.default)();
// Parse incoming requests data
app.use(json());
// No CORS restrictions
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/**
 * RUTAS
 */
app.use("/api", authRoutes_1.default);
/**
 * MIDDLEWARES
 */
app.use(ErrorHandlerMiddleware_1.ErrorHandlerMiddleware);
app.use(TypeORMErrorHandlerMiddleware_1.TypeORMErrorHandlerMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map