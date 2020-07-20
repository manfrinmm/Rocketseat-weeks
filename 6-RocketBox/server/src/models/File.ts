import mongoose, { Document } from "mongoose";

export interface IFileSchema extends Document {
  title: string;
  path: string;
}

const File = new mongoose.Schema<IFileSchema>(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

File.virtual("url_file").get(function (this: IFileSchema) {
  const url = process.env.URL || "http://localhost:3333";

  return `${url}/files/${encodeURIComponent(this.path)}`;
});

export default mongoose.model<IFileSchema>("File", File);
