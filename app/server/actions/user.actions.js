"use server";

import dbConnection from "@/configs/db";
import UserModel from "@/configs/userSchema";

export async function saveUserToDB({ name, email, userId, imageUrl }) {
  try {
    await dbConnection();

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      await UserModel.create({ name, email, userId, imageUrl });
      console.log("✅ User saved to DB");
    } else {
      console.log("✅ User already exists in DB");
    }
  } catch (error) {
    console.error("❌ Error saving user:", error);
    throw error;
  }
}
