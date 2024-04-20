import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    instituteName: {
      type: String,
    },
    degree: {
      type: String,
    },
    course: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model("Education", educationSchema);

export default Education;
