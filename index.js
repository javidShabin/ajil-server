import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDb } from "./src/configs/dbConnection.js";
import { errorHandler } from "./src/middlewares/ErrorHandler.js";
import apiRoutes from "./src/api.js";

const PORT = 5000;

const server = express();

server.use(cors());

server.use(cookieParser());
server.use(helmet());
server.use(express.json());

server.use(errorHandler);

server.get("/", (req, res) => {
  res.send("Hello world!");
});

server.use("/api", apiRoutes);

connectDb()
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
