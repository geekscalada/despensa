"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("./dotenv"));
const User_1 = require("../../domain/entities/User");
const Password_1 = require("../../domain/entities/Password");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: dotenv_1.default.DB_HOST, // Usamos las variables de entorno
    port: dotenv_1.default.DB_PORT,
    username: dotenv_1.default.DB_USER,
    password: dotenv_1.default.DB_PASSWORD,
    database: dotenv_1.default.DB_NAME,
    entities: [User_1.User, Password_1.Password], // Aquí se añaden las entidades
    synchronize: true, // Solo en desarrollo; para producción es recomendable usar migraciones
    logging: true, // Habilitar logging para depurar
    dropSchema: true,
    migrationsRun: true,
    migrations: ["src/migrations/*"],
});
const connectDB = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1); // Salir si la conexión falla
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map