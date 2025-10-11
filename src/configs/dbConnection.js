import mongoose from "mongoose";

let cached = global.mongoose; // cache connection in serverless env

if (!cached) cached = global.mongoose = { conn: null, promise: null };

const dbConnection = async () => {
  if (cached.conn) return cached.conn; // reuse existing connection

  if (!cached.promise) {
    if (!process.env.DB_CONNECTION_STRING) {
      throw new Error("DB_CONNECTION_STRING is missing in environment variables");
    }

    cached.promise = mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  cached.conn = await cached.promise;
  console.log("Database Connected...!");
  return cached.conn;
};

export { dbConnection };
