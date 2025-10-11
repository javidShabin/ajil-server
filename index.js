import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDb } from "./src/configs/dbConnection.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import apiRoutes from "./src/api.js";

const server = express();

// Middlewares
server.use(cors());
server.use(cookieParser());
server.use(helmet());
server.use(express.json());

// Routes
server.get("/", (req, res) => {
  res.send("Hello world!");
});

server.use("/api", apiRoutes);

// Global error handler
server.use(errorHandler);

// Connect to DB (Vercel runs cold starts, so ensure this is async safe)
connectDb()
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// ❌ No server.listen() here!
export default server;
