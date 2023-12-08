import { Document, Schema, model } from "mongoose";

// Enum representing different user active status types
export enum UserActiveStatusEnum {
  Active = "Active",
  Blocked = "Blocked",
  LogOut = "LogOut",
}

// Interface defining the structure of the UserActive document
export interface UserActive extends Document {
  jwt: string; // JWT token associated with the active session
  status: UserActiveStatusEnum; // Status of the user's activity (Active, Blocked, LogOut)
  user_id: any; // Reference to the associated User document
  expires: string; // Expiry date and time of the active session
}

// Schema for the UserActive model
const userActiveSchema = new Schema<UserActive>(
  {
    jwt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: UserActiveStatusEnum,
      default: UserActiveStatusEnum.Active,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expires: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add timestamps for 'createdAt' and 'updatedAt'
);

// Create the UserActive model from the schema
export default model<UserActive>("UserActive", userActiveSchema);
