import mongoose, { Document, Schema, model } from "mongoose";

export interface IPost extends Document {
  text: string;
  media: string[];
  author: any;
  //   list: any;
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
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //   list: {
    //     type: Schema.Types.ObjectId,
    //     ref: "List",
    //     required: true,
    //   },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export { Post };
