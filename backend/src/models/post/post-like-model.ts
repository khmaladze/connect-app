import mongoose, { Document, Schema } from "mongoose";

// Interface representing the structure of a Post Like
export interface IPostLike extends Document {
  post_id: any;
  like_author_id: any;
}

// Schema for the Post Like model
const postLikeSchema = new Schema<IPostLike>(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Post", // Reference to the Post model
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
const PostLike = mongoose.model("PostLike", postLikeSchema);

// Export the PostLike model
export { PostLike };
