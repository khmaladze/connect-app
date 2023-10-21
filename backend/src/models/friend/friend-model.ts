import mongoose, { Schema } from "mongoose";

const userFriendSchema = new mongoose.Schema(
  {
    user_profile_id: { type: Schema.Types.ObjectId, ref: "User" },
    friends: [
      {
        friends_from: { type: Date },
        friend_list: {
          type: String,
          enum: ["Friend", "CloseFriend", "Favorite"],
          default: "Friend",
        },
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },

  { timestamps: true }
);

const UserFriend = mongoose.model("UserFriend", userFriendSchema);

module.exports = UserFriend;
