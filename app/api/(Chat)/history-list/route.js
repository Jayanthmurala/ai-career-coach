import { NextResponse } from "next/server";
import dbConnection from "@/configs/db";
import UserModel from "@/configs/userSchema";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    await dbConnection();
    const user = await UserModel.findOne({ userId: userId });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const chatHistory = await UserModel.find({ AiChat: user.AiChat }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ data: chatHistory }, { status: 200 });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching chat history" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
