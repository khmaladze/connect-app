import mongoose, { Document, Schema } from "mongoose";

// Interface representing the structure of a Story Like
export interface IStoryLike extends Document {
  story_id: any;
  like_author_id: any;
}

// Schema for the Post Like model
const storyLikeSchema = new Schema<IStoryLike>(
  {
    story_id: {
      type: Schema.Types.ObjectId,
      ref: "Story", // Reference to the Post model
      required: true,
    },
    like_author_id: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Model for the Post Like
const StoryLike = mongoose.model("StoryLike", storyLikeSchema);

// Export the StoryLike model
export { StoryLike };
