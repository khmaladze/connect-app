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
  // backgroundImage?: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {}

interface UserDoc extends Document {
  firstname: string;
  lastname: string;
  username: string;
  gender: Gender;
  profileImage?: string;
  // backgroundImage?: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  email: string;
  password: string;
}

const userSchema = new Schema<UserDoc, UserModel>(
  {
    firstname: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastname: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    gender: {
      type: String,
      trim: true,
      enum: Object.values(Gender),
      lowercase: true,
      required: true,
    },
    profileImage: {
      type: String,
      trim: true,
      default: "",
    },
    // backgroundImage: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },
    birthDay: {
      type: Number,
      required: true,
      min: 1,
      max: 31,
    },
    birthMonth: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    birthYear: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
      maxlength: 4,
      minlength: 4,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserAttrs, UserDoc, UserModel };
