import express from "express";
import pkg from "body-parser";
const { json } = pkg;

import "reflect-metadata";
import { connectDB } from "./infrastructure/config/database.ts";
import userRoutes from "./routes/userRoutes.ts";
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandlerMiddleware.ts";
import { TypeORMErrorHandlerMiddleware } from "./middlewares/TypeORMErrorHandlerMiddleware.ts";

// TODO: jwt con rfresh token
// TODO: TDD para nuevos servicios
// TODO: uml para los nuevos casos de uso

const app = express();
app.use(json());

const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to the database");

    /**
     * ROUTES
     */
    app.use("/api", userRoutes);

    /**
     * MIDDLEWARES
     */
    app.use(ErrorHandlerMiddleware);
    app.use(TypeORMErrorHandlerMiddleware);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.info(`
        ********************************
        Server running on port ${PORT}
        ********************************
      `);
    });
  } catch (error) {
    console.error("Error while connecting to the database:", error);
    process.exit(1); // Cerrar el proceso si no se puede conectar a la base de datos
  }
};

startServer();
