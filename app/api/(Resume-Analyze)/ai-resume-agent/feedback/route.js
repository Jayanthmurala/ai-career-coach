import AiResumeAnalyzerModel from "@/configs/aiResumeAnalyzer";
import dbConnection from "@/configs/db";
import UserModel from "@/configs/userSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const recordId = searchParams.get("recordId");
  const userId = searchParams.get("userId");
  if (!recordId || !userId) {
    return new Response("Missing required parameters: recordId or userId", {
      status: 400,
    });
  }
  try {
    await dbConnection();
    const user = await UserModel.findOne({ userId });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const resumeAnalysis = await AiResumeAnalyzerModel.findOne({ recordId });
    if (!resumeAnalysis) {
      return new Response("Resume analysis not found", { status: 404 });
    }
    return NextResponse.json({ data: resumeAnalysis.content }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
