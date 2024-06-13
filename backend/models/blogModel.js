import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
