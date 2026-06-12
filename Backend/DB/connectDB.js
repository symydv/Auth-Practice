//using cohort's cluster for database

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected at ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error connecting to MongoDB:`, err.message);
    process.exit(1); //1 is failure, 0 is success. so we are exiting with failure code if we are not able to connect to database.
  }
}