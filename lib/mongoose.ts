import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");

  await mongoose.connect(uri, {
    dbName: "fyb_votes",
  });

  isConnected = true;
  console.log("✅ Connected to MongoDB");
}
