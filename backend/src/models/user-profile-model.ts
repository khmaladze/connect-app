import mongoose, { Schema, Document } from "mongoose";
import { userProfileData } from "../data/user-profile";

interface UserProfileAttrs {
  languages: string[];
  zodiac: string;
  education: string;
  passions: string[];
  user_profile_id: Schema.Types.ObjectId;
}

export interface UserProfileDoc extends Document, UserProfileAttrs {}

const userProfileSchema = new mongoose.Schema<UserProfileDoc>(
  {
    languages: {
      type: [String],
      enum: userProfileData.languages,
    },
    zodiac: {
      type: String,
      enum: userProfileData.zodiac,
    },
    education: {
      type: String,
      enum: userProfileData.education,
    },
    passions: {
      type: [String],
      enum: userProfileData.passions,
    },
    user_profile_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model<UserProfileDoc>(
  "UserProfile",
  userProfileSchema
);

export { UserProfile, UserProfileAttrs };
