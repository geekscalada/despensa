import sanitizedConfig from "./infrastructure/config/dotenv.ts";
import express from "express";

import pkg from "body-parser";
const { json } = pkg;

import { createConnection } from "typeorm";
import "reflect-metadata";
import { connectDB } from "./infrastructure/config/database.ts";

const app = express();

app.use(json());

// Start the server
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  connectDB();
  console.info(`
    ********************************
    Server running on port ${PORT}
    ********************************
    `);
});


