import mongoose, { Schema } from "mongoose";
const interviewSchema = new Schema()(
  {
    role: { type: String, required: true },
    industry: { type: String, required: true },
    experience: { type: String, required: true },
    difficulty: { type: Number, required: true },
    numberOfQuestions: { type: String, required: true },
    techStack: { type: String, required: true },
    jobDescription: { type: String },
    userId: { type: String, required: true },
    totalInterviews: { type: Number, default: 0 },
    score: { type: [Number], default: [0] },
    questions: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const InterviewModel =
  mongoose.models?.Interview || mongoose.model("Interview", interviewSchema);

export default InterviewModel;
