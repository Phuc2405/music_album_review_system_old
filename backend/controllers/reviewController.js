"get own review function"
const Review = require('../models/review');
const getReviews = async (req, res) => {
try {
const reviews = await Review.find({ userID: req.user.id });
res.json(reviews);
} catch (error) {
res.status(500).json({ message: error.message });
}
};
"get all review for an album function"
const getReviewsByAlbum = async (req, res) => {
  try {
    const reviews = await Review.find({ albumID: req.params.albumID }).populate(
      "userID",
      "userNickname",
    );

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
"Add Review Function"
const addReview = async (req, res) => {
const { reviewRate, reviewContent, albumID } = req.body;
try {
const review = await Review.create({ userID: req.user.id, reviewRate, reviewContent, albumID });
res.status(201).json(review);
} catch (error) {
res.status(500).json({ message: error.message });
}
};
"Update Review Function"
const updateReview = async (req, res) => {
const { reviewRate, reviewContent } = req.body;
try {
const review = await Review.findById(req.params.id);
if (!review) return res.status(404).json({ message: 'Review not found' });
if (review.userID.toString() !== req.user.id)
  return res.status(403).json({ message: "Not authorized" });
review.reviewRate = reviewRate ?? review.reviewRate;
review.reviewContent = reviewContent ?? review.reviewContent;
const updatedReview = await review.save();
res.json(updatedReview);
} catch (error) {
res.status(500).json({ message: error.message });
}
};
"Delete Review Function"
const deleteReview = async (req, res) => {
try {
const review = await Review.findById(req.params.id);
if (!review) return res.status(404).json({ message: 'Review not found' });
if (review.userID.toString() !== req.user.id)
  return res.status(403).json({ message: "Not authorized" });
await review.deleteOne();
res.json({ message: 'Review deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};
module.exports = {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
  getReviewsByAlbum,
};