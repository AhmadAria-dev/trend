import mongoose from "mongoose";

const connections = {};

export default async function connectDB() {
  if (connections.isConnected) return;
  try {
    const db = await mongoose.connect(process.env.DB_ADDRESS);
    connections.isConnected = db.connections[0].readyState;
    console.log("connected to MongoDB");
    return db;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    setTimeout(connectDB, 5000);
  }
}
