import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    resume: { type: [String], default: [] },
    interview: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
        default: [],
      },
    ],
    AiChat: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AiChat",
        default: [],
      },
    ],
    AiResumeAnalyzer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AiResumeAnalyzer",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists before defining it
const UserModel = mongoose.models?.User || mongoose.model("User", userSchema);

export default UserModel;
