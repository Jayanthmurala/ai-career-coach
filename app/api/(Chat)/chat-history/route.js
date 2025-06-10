import { NextResponse } from "next/server";
import AiChatModel from "@/configs/aiChatSchema";
import UserModel from "@/configs/userSchema";
import dbConnection from "@/configs/db";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");
  const userId = searchParams.get("userId");
  if (!chatId || !userId) {
    return new Response("Missing required parameters: chatId or userId", {
      status: 400,
    });
  }
  try {
    await dbConnection();
    const user = await UserModel.findOne({ userId });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const chat = await AiChatModel.findOne({ _id: chatId });
    if (!chat) {
      return new Response("Chat not found", { status: 404 });
    }
    return NextResponse.json({ data: chat.content }, { status: 200 });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return new Response("Error fetching chat history", { status: 500 });
  }
}
