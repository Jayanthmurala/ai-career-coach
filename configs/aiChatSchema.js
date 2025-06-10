import mongoose from "mongoose";

const AiChatSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    chatId: { type: String, required: true, unique: true },
    content: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);
const AiChatModel =
  mongoose.models?.AiChat || mongoose.model("AiChat", AiChatSchema);

export default AiChatModel;
