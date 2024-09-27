import sanitizedConfig from "./infrastructure/config/dotenv";
import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import { createConnection } from "typeorm";
import "reflect-metadata";
const app = express();
app.use(json());
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await createConnection(); // Conexión con la base de datos
    console.info(`
    ********************************
    Server running on port ${PORT}
    ********************************
    `);
});
const dbPass = sanitizedConfig.DB_PASSWORD;
// console.log(`DB Password: ${dbPass}`);
