"use server";

import AiChatModel from "@/configs/aiChatSchema";
import dbConnection from "@/configs/db";
import UserModel from "@/configs/userSchema";

const aichatAction = async ({ userId, chatId, content }) => {
  if (!chatId || !content) {
    throw new Error("Missing required parameters: userId, chatId, or content");
  }

  try {
    await dbConnection();

    const user = await UserModel.findOne({ userId });
    if (!user) throw new Error("User not found");

    const existingChat = await AiChatModel.findOne({ chatId });

    if (existingChat) {
      // Push new content into the existing chat's content array
      await AiChatModel.updateOne(
        { chatId },
        { $push: { content: { $each: content } } }
      );
    } else {
      // Create new chat
      const newChat = await AiChatModel.create({
        userId,
        chatId,
        content,
      });

      user.AiChat.push(newChat._id);
      await user.save();
    }

    return { success: true };
  } catch (error) {
    console.error("Error in aichatAction:", error);
    return { success: false, error: error.message };
  }
};

export default aichatAction;
