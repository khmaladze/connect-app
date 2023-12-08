import mongoose, { Schema, Document } from "mongoose";
import { userProfileData } from "../../data/user-profile";

// Interface defining the attributes of the UserProfile
interface UserProfileAttrs {
  languages: string[];
  zodiac: string;
  education: string;
  passions: string[];
  user_profile_id: Schema.Types.ObjectId;
}

// Interface defining the structure of the UserProfile document
export interface UserProfileDoc extends Document, UserProfileAttrs {}

// Define the schema for the UserProfile model
const userProfileSchema = new mongoose.Schema<UserProfileDoc>(
  {
    languages: {
      type: [String],
      enum: userProfileData.languages, // Use enum for valid language values
    },
    zodiac: {
      type: String,
      enum: userProfileData.zodiac, // Use enum for valid zodiac values
    },
    education: {
      type: String,
      enum: userProfileData.education, // Use enum for valid education values
    },
    passions: {
      type: [String],
      enum: userProfileData.passions, // Use enum for valid passion values
    },
    user_profile_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Create the UserProfile model from the schema
const UserProfile = mongoose.model<UserProfileDoc>(
  "UserProfile",
  userProfileSchema
);

export { UserProfile, UserProfileAttrs };
