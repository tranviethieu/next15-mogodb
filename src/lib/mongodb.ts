// lib/mongodb.ts
import mongoose from "mongoose";

//const MONGODB_ = process.env.MONGODB_URI as string;
const MONGODB_URI =
  "mongodb+srv://hieutran98tb:yyvw0zDCphsmYSAR@cluster0.bj6ivho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
