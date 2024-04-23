import mongoose from "mongoose";
const { Schema } = mongoose;

const admissionBatchSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    admissionFee: {
      type: Number,
      required: true,
      default: 0
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    lastDateToApply: {
      type: Date,
      required: true,
    },
    certificate: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    selectedCourses: [{
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    }
    ],

  },
  // other fields...

  {
    timestamps: true,
  }
);

const AdmissionBatch = mongoose.model("AdmissionBatch", admissionBatchSchema);

export default AdmissionBatch;
