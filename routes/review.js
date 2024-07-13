const expres = require("express");
const router = expres.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  validateReview,
  isreviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Reviews
//Post review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isreviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
