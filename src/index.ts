import express from "express";
import pkg from "body-parser";
const { json } = pkg;

import "reflect-metadata";
import { connectDB } from "./infrastructure/config/database";
import userRoutes from "./routes/authRoutes";
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandlerMiddleware";
import { TypeORMErrorHandlerMiddleware } from "./middlewares/TypeORMErrorHandlerMiddleware";

// TODO: TDD para nuevos servicios
// TODO: uml para los nuevos casos de uso

const app = express();

// Parse incoming requests data
app.use(json());

const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to the database");

    // No CORS restrictions
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

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
