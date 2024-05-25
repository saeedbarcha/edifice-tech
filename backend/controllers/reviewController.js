import asyncHandler from "../middleware/asyncHandler.js";
import Review from "../models/reviewModel.js";
import Course from "../models/courseModel.js"

// @desc    Fetch reviews for a course
// @route   GET /api/reviews/:courseId/reviews
// @access  Public
const getReviewsForCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params; // Fetch courseId from URL params
  try {
    // Fetch reviews based on the courseId
    const reviews = await Review.find({ course: courseId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// @desc    Create a review for a course
// @route   POST /api/reviews/:courseId/reviews
// @access  Private
const createCourseReview = asyncHandler(async (req, res) => {
  const { courseId, rating, comment } = req.body;
  const userId = req.user._id;

  try {

    const existingReview = await Review.findOne({ user: userId, course: courseId });
    const course = await Course.findById(courseId);

    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this course" });
    }
    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    // const review = await Review.create({ user: userId, course: courseId, rating, comment });s
    const review = await Review.create({ user: userId, course: courseId, rating: parseFloat(rating).toFixed(1), comment });

    course.numReviews += 1;
    course.rating = ((course.rating * (course.numReviews - 1)) + review.rating) / course.numReviews;

    await course.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// // @desc    Update a review
// // @route   PUT /api/reviews/:id
// // @access  Private
// const updateReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body;

//   try {
//     const review = await Review.findById(req.params.id);

//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     // Check if the user is the owner of the review
//     if (review.user.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: "Not authorized to update this review" });
//     }

//     review.rating = rating;
//     review.comment = comment;

//     const updatedReview = await review.save();
//     res.json(updatedReview);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // @desc    Delete a review
// // @route   DELETE /api/reviews/:id
// // @access  Private
// const deleteReview = asyncHandler(async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.id);

//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     // Check if the user is the owner of the review
//     if (review.user.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: "Not authorized to delete this review" });
//     }

//     await review.remove();
//     res.json({ message: "Review removed" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });


const updateCourseReview = asyncHandler(async (req, res) => {
  const { reviewId, rating, comment } = req.body;
  const userId = req.user._id;

  try {
    let review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Ensure only the owner can update the review
    if (review.user.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update review details
    review.rating = rating;
    review.comment = comment;

    // Save the updated review
    await review.save();

    // Find the associated course
    const course = await Course.findById(review.course);

    // Recalculate the course's rating based on all reviews
    const allReviews = await Review.find({ course: review.course });
    let totalRating = 0;
    allReviews.forEach((rev) => {
      totalRating += rev.rating;
    });
    course.rating = totalRating / allReviews.length;

    // Save the updated course rating
    await course.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const deleteCourseReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  try {
    let review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Ensure only the owner can delete the review
    if (review.user.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the associated course
    const course = await Course.findById(review.course);

    // Remove the review
    await review.remove();

    // Recalculate the course's rating based on the remaining reviews
    const allReviews = await Review.find({ course: review.course });
    if (allReviews.length > 0) {
      let totalRating = 0;
      allReviews.forEach((rev) => {
        totalRating += rev.rating;
      });
      course.rating = totalRating / allReviews.length;
    } else {
      course.rating = 0; // If no reviews left, set rating to 0
    }

    // Decrement numReviews
    course.numReviews -= 1;

    // Save the updated course details
    await course.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
export { getReviewsForCourse, createCourseReview, updateCourseReview, deleteCourseReview };
