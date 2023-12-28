import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the document
interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  message: string;
}

// Define the schema for user friend requests
const messagesSchema = new mongoose.Schema<IMessage>(
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

    message: {
      type: String,
      required: true,
      maxlength: 300,
    },
  },
  { timestamps: true } // Include timestamps for createdAt and updatedAt
);

// Create and export the Message model
export const Message = mongoose.model<IMessage>("Message", messagesSchema);
