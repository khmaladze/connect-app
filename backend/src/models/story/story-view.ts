import mongoose, { Document, Schema } from "mongoose";

// Interface representing the structure of a Story View
export interface IStoryView extends Document {
  story_id: any;
  view_author_id: any;
}

// Schema for the Story View model
const storyViewSchema = new Schema<IStoryView>(
  {
    story_id: {
      type: Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    view_author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Model for the Story View
const StoryView = mongoose.model("StoryView", storyViewSchema);

// Export the StoryView model
export { StoryView };
