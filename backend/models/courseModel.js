import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
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
    price: {
        type: Number,
        required: true,
      },
    discount: {
        type: String,
        default: "0",
      },
    skillSet: {
      type: String,
      required: true,
    },
    preRequisites: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    hoursInDay: {
      type: Number,
      required: true,
    },
    daysInWeek: {
      type: Number,
      required: true,
    },
    totalDuration: {
      type: String,
      required: true,
    },
    certificate:{
        type: Boolean,
        required: true,
        default: true,
      },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }],
      rating:{
        type:Number,
        required:true,
        default:0,
    },
    numReviews:{
        type:Number,
        required:true,
        default:0,
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

const Course = mongoose.model("Course", courseSchema);

export default Course;
