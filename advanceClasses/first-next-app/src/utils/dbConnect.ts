import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

export default async function dbConnect(): Promise<void> {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("Mongo DB URI is undefined or empty");
    throw new Error("Mongo DB URI is undefined or empty");
  }
  // const DB_NAME = process.env.DB_NAME;
  if (connection.isConnected) {
    console.log("Connection already exist");
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI);
    console.log(connectionInstance);
    connection.isConnected = connectionInstance.connections[0].readyState;
    console.log("Mongo DB connection successfull");
  } catch (error) {
    console.error("MONGO DB connection failed: ", error);
  } finally {
    console.log("DB process complete!!!")
  }
}
