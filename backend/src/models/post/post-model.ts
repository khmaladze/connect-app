import mongoose, { Document, Schema } from "mongoose";

// Enum representing different friend list types
enum FriendList {
  Friend = "Friend",
  CloseFriend = "CloseFriend",
  Favorite = "Favorite",
}

// Interface defining the structure of a post
export interface IPost extends Document {
  text: string;
  media: { url: string; public_id: string }[];
  author: Schema.Types.ObjectId;
  list: FriendList;
  expiryDate: Date;
}

// Define the schema for the Post model
const postSchema = new Schema<IPost>(
  {
    text: {
      type: String,
      maxlength: 500,
    },
    media: [
      {
        url: String,
        public_id: String,
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    list: {
      type: String,
      enum: Object.values(FriendList),
      required: true,
      default: FriendList.Friend,
    },
    expiryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

// Create the Post model from the schema
const Post = mongoose.model<IPost>("Post", postSchema);

export { Post };
