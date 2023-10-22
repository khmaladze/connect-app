import mongoose from "mongoose";

const userFriendAddSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friend_list: {
      type: String,
      enum: ["Friend", "CloseFriend", "Favorite"],
      default: "Friend",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const UserFriendAdd = mongoose.model(
  "UserFriendAdd",
  userFriendAddSchema
);
