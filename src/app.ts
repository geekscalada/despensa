import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import userRoutes from "./app/interfaces/routes/authRoutes";
import { ErrorHandlerMiddleware } from "./infrastructure/middlewares/ErrorHandlerMiddleware";
import { TypeORMErrorHandlerMiddleware } from "./infrastructure/middlewares/TypeORMErrorHandlerMiddleware";

// Inicializar Express
const app = express();

// Parse incoming requests data
app.use(json());

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
 * RUTAS
 */
app.use("/api", userRoutes);

/**
 * MIDDLEWARES
 */
app.use(ErrorHandlerMiddleware);
app.use(TypeORMErrorHandlerMiddleware);

export default app;
