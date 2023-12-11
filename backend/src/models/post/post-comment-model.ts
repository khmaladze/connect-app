import mongoose, { Schema, Document } from "mongoose";

// Define the structure of a Comment document
export interface Comment extends Document {
  author_id: string;
  post_id: string;
  comment: string;
}

// Define the schema for the Comment model
const CommentSchema: Schema = new Schema(
  {
    // Author's ID associated with the comment
    author_id: { type: String, required: true },

    // Post's ID to which the comment belongs
    post_id: { type: String, required: true },

    // The actual comment content
    comment: { type: String, required: true, maxlength: 70 }, // Adding max length validation
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Create the Comment model based on the CommentSchema
const CommentModel = mongoose.model<Comment>("Comment", CommentSchema);

// Export the Comment model for use in other parts of the application
export default CommentModel;
