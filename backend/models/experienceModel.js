import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    instituteName: {
      type: String,
    },
    designation: {
      type: String,
    },
    joiningDate: {
      type: Date,
    },
    endingDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
