import mongoose from "mongoose";
import dns from "dns";

// Ensure MongoDB Atlas SRV DNS resolution succeeds on Windows environments
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (dnsErr) {
  console.warn("Could not set custom DNS servers:", dnsErr.message);
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI is not defined in the environment variables!");
    throw new Error("MONGODB_URI is required");
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Atlas connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}