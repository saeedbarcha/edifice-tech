import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    iconImage: {
      type: String,
    },
    bannerImage: {
      type: String,
    },
    youtubeVideoUrl: {
      type: String,
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

const Service = mongoose.model("Service", serviceSchema);

export default Service;
