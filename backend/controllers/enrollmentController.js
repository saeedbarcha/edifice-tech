import asyncHandler from "../middleware/asyncHandler.js";
import Enrollment from "../models/enrollmentModel.js";
import AdmissionBatch from "../models/admissionBatchModel.js"

// @desc    Add enrollment
// @route   POST /api/enrollments
// @access  Private
const newEnrollment = asyncHandler(async (req, res) => {
    const { admissionBatchId, courses, firstName, lastName, fatherName, gender } = req.body;

    const userId = req.user._id;

    try {
        if (!admissionBatchId) {
            res.status(404);
            return res.json({ error: "Admission batch not found" }); 
        } else if (!firstName) {
            res.status(400);
            return res.json({ error: "First name is required" });
        } else if (!lastName) {
            res.status(400);
            return res.json({ error: "Last name is required" });
        } else if (!fatherName) {
            res.status(400);
            return res.json({ error: "Father name is required" });
        } else if (!gender) {
            res.status(400);
            return res.json({ error: "Gender is required" });
        }
        else if (courses.length === 0) {
            res.status(400);
            return res.json({ error: "Select at least 1 course to enroll" });
        } else {
            const existingEnrollments = await Enrollment.find({
                user: userId,
                admissionBatchId: admissionBatchId,
                courseId: { $in: courses }
            });

            if (existingEnrollments.length > 0) {
                const enrolledCourses = existingEnrollments.map(enrollment => enrollment.courseId);
                res.status(400);
                return res.json({ error: "You are already enrolled in one of the selected courses", enrolledCourses });
            }

            const enrollments = [];

            for (const courseId of courses) {
                const newEnrollment = new Enrollment({
                    user: userId,
                    admissionBatchId,
                    courseId,
                    firstName,
                    lastName,
                    fatherName,
                    gender
                });
                const createdEnrollment = await newEnrollment.save();
                enrollments.push(createdEnrollment);
            }

            res.status(200).json({ message: "Enrolled successfully", enrollments });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update enrollment by admin to issue certificate
// @route   PUT /api/enrollments/:id/issueCertificate
// @access  Private (admin)
const updateEnrollmentToIssueCertificate = asyncHandler(async (req, res) => {
    const { enrollmentId,
        firstName,
        lastName,
        fatherName,
        gender,
        performance,
        issueCertificate,
        admissionFeePaid,
        courseFeePaid,
        completed
    } = req.body;

    try {
        // Check if the enrollment exists
        const enrollment = await Enrollment.findById(enrollmentId);

        if (!enrollment) {
            res.status(404);
            return res.json({ error: "Enrollment not found" });
        } else {
            enrollment.firstName = firstName || enrollment.firstName;
            enrollment.lastName = lastName || enrollment.lastName;
            enrollment.fatherName = fatherName || enrollment.fatherName;
            enrollment.performance = performance || enrollment.performance;
            enrollment.gender = gender || enrollment.gender;
            enrollment.issueCertificate = issueCertificate || enrollment.issueCertificate;
            enrollment.admissionFeePaid = admissionFeePaid || enrollment.admissionFeePaid;
            enrollment.courseFeePaid = courseFeePaid || enrollment.courseFeePaid;
            enrollment.courseFeePaid = courseFeePaid || enrollment.courseFeePaid;
            enrollment.completed = completed || enrollment.completed;



            const updatedEnrollment = await enrollment.save();

            res.status(200).json({ message: "Enrollment updated successfully to issue certificate", updatedEnrollment });
        }


    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// @desc    Get all admission batches and their enrolled courses for a user
// @route   GET /api/admission-batches/enrollments
// @access  Private/admin
const getAllAdmissionBatchesWithEnrolments = asyncHandler(async (req, res) => {
    try {
        const userEnrollments = await Enrollment.find().populate('courseId');
        const userEnrolledBatchIds = userEnrollments.map(enrollment => enrollment.admissionBatchId);
        const admissionBatches = await AdmissionBatch.find({ _id: { $in: userEnrolledBatchIds } }).populate('selectedCourses.courseId');
        const result = admissionBatches.map(batch => {
            const batchEnrollments = userEnrollments.filter(enrollment => enrollment.admissionBatchId.toString() === batch._id.toString());
            return {
                batch,
                enrollments: batchEnrollments
            };
        });
        res.status(200).json({ admissionBatches: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// @desc    Get all admission batches and their enrolled courses for a user
// @route   GET /api/admission-batches/enrollments
// @access  Private
const getUserAdmissionBatches = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const userEnrollments = await Enrollment.find({ user: userId }).populate('courseId');
        const userEnrolledBatchIds = userEnrollments.map(enrollment => enrollment.admissionBatchId);
        const admissionBatches = await AdmissionBatch.find({ _id: { $in: userEnrolledBatchIds } }).populate('selectedCourses.courseId');
        const result = admissionBatches.map(batch => {
            const batchEnrollments = userEnrollments.filter(enrollment => enrollment.admissionBatchId.toString() === batch._id.toString());
            return {
                batch,
                enrollments: batchEnrollments
            };
        });
        res.status(200).json({ admissionBatches: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private
const deleteEnrollment = asyncHandler(async (req, res) => {
    const enrollment = await Enrollment.findById(req.params.id);
    if (enrollment) {
        await Enrollment.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Enrollment deleted successfully" });
    } else {
        res.status(404);
        throw new Error("Enrollment not found");
    }
});

// @desc    Update enrollment
// @route   PUT /api/enrollments/:id
// @access  Private
const updateEnrollment = asyncHandler(async (req, res) => {
    const { firstName, lastName, fatherName, completed, courseFeePaid, performance } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);
    if (enrollment) {
        enrollment.firstName = firstName || enrollment.firstName;
        enrollment.lastName = lastName || enrollment.lastName;
        enrollment.fatherName = fatherName || enrollment.fatherName;
        enrollment.completed = completed ?? enrollment.completed;
        enrollment.courseFeePaid = courseFeePaid ?? enrollment.courseFeePaid;
        enrollment.performance = performance || enrollment.performance;

        const updatedEnrollment = await enrollment.save();

        res.status(200).json(updatedEnrollment);
    } else {
        res.status(404);
        throw new Error("Enrollment not found");
    }
});

export { deleteEnrollment, updateEnrollmentToIssueCertificate, updateEnrollment, newEnrollment, getAllAdmissionBatchesWithEnrolments, getUserAdmissionBatches };
