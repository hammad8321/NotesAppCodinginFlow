import { InferSchemaType, Schema, model } from "mongoose";

const noteScheme = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

type Note = InferSchemaType<typeof noteScheme>;

export default model<Note>("Note", noteScheme);
