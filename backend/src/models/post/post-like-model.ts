import mongoose, { Document, Schema } from "mongoose";

export interface IPostLike extends Document {
  post_id: any;
  like_author_id: any;
}

const postLikeSchema = new Schema<IPostLike>(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    like_author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const PostLike = mongoose.model("PostLike", postLikeSchema);

export { PostLike };
