import mongoose, { Document } from "mongoose";

interface ITweetSchema extends Document {
  author: string;
  content: string;
  likes: string[];
  created_at?: Date;
}

const TweetSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: [String],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ITweetSchema>("Tweet", TweetSchema);
