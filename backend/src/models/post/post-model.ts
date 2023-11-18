import mongoose, { Document, Schema } from "mongoose";

enum FriendList {
  Friend = "Friend",
  CloseFriend = "CloseFriend",
  Favorite = "Favorite",
}

export interface IPost extends Document {
  text: string;
  media: string[];
  author: any;
  list: FriendList;
}

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
      enum: FriendList,
      required: true,
      default: FriendList.Friend,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export { Post };
