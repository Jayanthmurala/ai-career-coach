import mongoose from "mongoose";

const aiResumeAnalyzerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    recordId: { type: String, required: true, unique: true },
    content: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);
const AiResumeAnalyzerModel =
  mongoose.models?.AiResumeAnalyzer ||
  mongoose.model("AiResumeAnalyzer", aiResumeAnalyzerSchema);

export default AiResumeAnalyzerModel;
