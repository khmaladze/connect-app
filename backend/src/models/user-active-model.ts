import { Document, Schema, model } from "mongoose";

export enum UserActiveStatusEnum {
  Active = "Active",
  Blocked = "blocked",
  LogOut = "LogOut",
}

export interface UserActive extends Document {
  jwt: string;
  status: UserActiveStatusEnum;
  user_id: any;
  expires: string;
}

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
  { timestamps: true }
);

export default model<UserActive>("UserActive", userActiveSchema);
