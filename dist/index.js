"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Necesario para TypeORM
const app_1 = __importDefault(require("./app")); // Importamos la configuración de la aplicación
const database_1 = require("./infrastructure/config/database");
// Función para arrancar el servidor
const startServer = async () => {
    try {
        await (0, database_1.connectDB)();
        console.log("Connected to the database");
        const PORT = process.env.PORT || 3000;
        app_1.default.listen(PORT, () => {
            console.info(`
        ********************************
        Server running on port ${PORT}
        ********************************
      `);
        });
    }
    catch (error) {
        console.error("Error while connecting to the database:", error);
        process.exit(1); // Cierra el proceso si no se puede conectar a la base de datos
    }
};
startServer();
//# sourceMappingURL=index.js.map