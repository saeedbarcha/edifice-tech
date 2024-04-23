import mongoose from "mongoose";
const { Schema } = mongoose;
const enrollmentSchema = new Schema(
    {
        admissionBatchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AdmissionBatch",
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        fatherName: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        courseFeePaid: {
            type: Boolean,
            default: false,
        },
        performance: {
            type: String,
            enum: ['Excellent', 'Good', 'Average', 'Poor'],
            default: 'Average',
        },

    },

    {
        timestamps: true,
    }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
