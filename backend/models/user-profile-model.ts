import mongoose, { Schema } from "mongoose";
import { userProfileData } from "../data/user-profile";

const userProfileSchema = new mongoose.Schema(
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

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export { UserProfile };
