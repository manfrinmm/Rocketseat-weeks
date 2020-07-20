import mongoose, { Document } from "mongoose";

import { IFileSchema } from "./File";

interface IBoxSchema extends Document {
  title: string;
  files?: IFileSchema[];
}

const Box = new mongoose.Schema<IBoxSchema>(
  {
    title: {
      type: String,
      required: true,
    },
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export default mongoose.model<IBoxSchema>("Box", Box);
