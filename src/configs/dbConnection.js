import mongoose from "mongoose";

// Cache the connection for serverless environments
let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectDb = async () => {
  if (cached.conn) return cached.conn; // reuse existing connection

  if (!cached.promise) {
    if (!process.env.DB_CONNECTION_STRING) {
      throw new Error("DB_CONNECTION_STRING is not set in environment variables");
    }

    cached.promise = mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export { connectDb };
