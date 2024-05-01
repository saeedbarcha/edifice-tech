import asyncHandler from "../middleware/asyncHandler.js";
import Review from "../models/reviewModel.js";

// @desc    Fetch reviews for a course
// @route   GET /api/courses/:courseId/reviews
// @access  Public
const getReviewsForCourse = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ course: req.params.courseId }).populate(
    "user",
    "name"
  );
  res.status(200).json(reviews);
});

// @desc    Create a review for a course
// @route   POST /api/courses/:courseId/reviews
// @access  Private
const createCourseReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { courseId } = req.params;
  const user = req.user._id;

  try {
    const review = await Review.create({ user, course: courseId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user is the owner of the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this review" });
    }

    review.rating = rating;
    review.comment = comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user is the owner of the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this review" });
    }

    await review.remove();
    res.json({ message: "Review removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export { getReviewsForCourse, createCourseReview, updateReview, deleteReview };
