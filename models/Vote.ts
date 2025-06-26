import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    category: String,
    nominee: String,
  },
  { timestamps: true }
);

export const Vote = mongoose.models.Vote || mongoose.model("Vote", voteSchema);
