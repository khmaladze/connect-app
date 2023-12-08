import mongoose, { Schema, Document } from "mongoose";

// Enum representing different friend list types
enum FriendListType {
  Friend = "Friend",
  CloseFriend = "CloseFriend",
  Favorite = "Favorite",
}

// Define the structure of a friend entry in the user's friend list
interface FriendEntry {
  friends_from: Date;
  friend_list: FriendListType;
  user_id: Schema.Types.ObjectId;
}

// Define the structure of the UserFriend document
interface UserFriendDocument extends Document {
  user_profile_id: Schema.Types.ObjectId;
  friends: FriendEntry[];
}

// Define the schema for the UserFriend model
const userFriendSchema = new mongoose.Schema<UserFriendDocument>(
  {
    // Reference to the user profile for which the friend list is maintained
    user_profile_id: { type: Schema.Types.ObjectId, ref: "User" },

    // Array of friends, each represented by a FriendEntry
    friends: [
      {
        // Date when the friendship was established (default is the current date)
        friends_from: { type: Date, default: Date.now },

        // Type of friendship (using the FriendListType enum)
        friend_list: {
          type: String,
          enum: Object.values(FriendListType),
          default: FriendListType.Friend, // Default to "Friend" if not specified
        },

        // Reference to the friend's user profile
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true } // Include timestamps for createdAt and updatedAt
);

// Create the UserFriend model from the schema
export const UserFriend = mongoose.model<UserFriendDocument>(
  "UserFriend",
  userFriendSchema
);
