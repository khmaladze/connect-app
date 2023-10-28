import mongoose, { Document, Model, Schema } from "mongoose";

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface UserAttrs {
  firstname: string;
  lastname: string;
  username: string;
  gender: Gender;
  profileImage?: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  email: string;
  password: string;
  isActive?: boolean;
  isBlocked?: boolean;
}

interface UserModel extends Model<UserDoc> {}

interface UserDoc extends Document {
  firstname: string;
  lastname: string;
  username: string;
  gender: Gender;
  profileImage?: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  email: string;
  password: string;
  isActive: boolean;
  isBlocked: boolean;
}

const userSchema = new Schema<UserDoc, UserModel>(
  {
    firstname: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "First name is required."],
      minlength: [2, "First name should be at least 2 characters."],
      maxlength: [50, "First name should not exceed 50 characters."],
    },
    lastname: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Last name is required."],
      minlength: [2, "Last name should be at least 2 characters."],
      maxlength: [50, "Last name should not exceed 50 characters."],
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Username is required."],
      minlength: [2, "Username should be at least 2 characters."],
      maxlength: [50, "Username should not exceed 50 characters."],
    },
    gender: {
      type: String,
      trim: true,
      enum: Object.values(Gender),
      lowercase: true,
      required: [true, "Gender is required."],
    },
    profileImage: {
      type: String,
      trim: true,
      default: "",
    },
    birthDay: {
      type: Number,
      required: [true, "Birth day is required."],
      min: [1, "Birth day should be at least 1."],
      max: [31, "Birth day should not exceed 31."],
    },
    birthMonth: {
      type: Number,
      required: [true, "Birth month is required."],
      min: [1, "Birth month should be at least 1."],
      max: [12, "Birth month should not exceed 12."],
    },
    birthYear: {
      type: Number,
      required: [true, "Birth year is required."],
      min: [1900, "Birth year should be at least 1900."],
      max: [new Date().getFullYear(), "Invalid birth year."],
      maxlength: [4, "Birth year should be 4 characters."],
      minlength: [4, "Birth year should be 4 characters."],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required."],
      maxlength: [100, "Email should not exceed 100 characters."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [10, "Password should be at least 10 characters."],
      maxlength: [100, "Password should not exceed 100 characters."],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserAttrs, UserDoc, UserModel };
