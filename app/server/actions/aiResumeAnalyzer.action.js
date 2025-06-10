import AiResumeAnalyzerModel from "@/configs/aiResumeAnalyzer";
import dbConnection from "@/configs/db";
import UserModel from "@/configs/userSchema";

const aiResumeAnalyzerAction = async (userId, recordId, content) => {
  console.log(userId, "userid from actions ");
  if (!recordId || !content) {
    throw new Error(
      "Missing required parameters: userId, recordId, or content"
    );
  }

  try {
    await dbConnection();

    const user = await UserModel.findOne({ userId });
    if (!user) throw new Error("User not found");
    const addResume = await AiResumeAnalyzerModel.create({
      userId,
      recordId,
      content,
    });
    if (!addResume) throw new Error("Resume not found");
    user.AiResumeAnalyzer.push(addResume._id);
    await user.save();
    console.log("✅ Resume saved to DB");
    return addResume;
  } catch (error) {
    console.error("❌ Error saving resume:", error);
    throw error;
  }
};

export default aiResumeAnalyzerAction;
