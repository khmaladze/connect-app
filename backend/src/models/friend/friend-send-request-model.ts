import mongoose, { Schema, Document } from "mongoose";

// Enum for friend list types
enum FriendListType {
  Friend = "Friend",
  CloseFriend = "CloseFriend",
  Favorite = "Favorite",
}

// Enum for friend request statuses
enum FriendRequestStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

// Define the interface for the document
interface IUserFriendAdd extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  friend_list: FriendListType;
  status: FriendRequestStatus;
}

// Define the schema for user friend requests
const userFriendAddSchema = new mongoose.Schema<IUserFriendAdd>(
  {
    // Sender of the friend request
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    // Receiver of the friend request
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    // Type of friendship (using the FriendListType enum)
    friend_list: {
      type: String,
      enum: Object.values(FriendListType),
      default: FriendListType.Friend,
    },

    // Status of the friend request (using the FriendRequestStatus enum)
    status: {
      type: String,
      enum: Object.values(FriendRequestStatus),
      default: FriendRequestStatus.Pending,
    },
  },
  { timestamps: true } // Include timestamps for createdAt and updatedAt
);

// Create and export the UserFriendAdd model
export const UserFriendAdd = mongoose.model<IUserFriendAdd>(
  "UserFriendAdd",
  userFriendAddSchema
);
