import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DATABASE_URL, {});
      console.log("Database connected successfully");
    }
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default dbConnection;
