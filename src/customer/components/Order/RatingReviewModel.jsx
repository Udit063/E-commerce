//@ts-nocheck
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { createRating, createReview } from "../../../store/Product/Action";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const RatingReviewModal = ({ open, onClose, product, orderItemId }) => {
  const dispatch = useDispatch();
  const { ratingLoading, reviewLoading } = useSelector(
    (store) => store.products
  );

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({ rating: "", review: "" });
  const [submitStatus, setSubmitStatus] = useState({
    rating: false,
    review: false,
  });

  const handleSubmit = async () => {
    // Validate inputs
    const newErrors = { rating: "", review: "" };
    let hasError = false;

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
      hasError = true;
    }

    if (review.trim().length === 0) {
      newErrors.review = "Please write a review";
      hasError = true;
    } else if (review.trim().length < 10) {
      newErrors.review = "Review must be at least 10 characters long";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    try {
      // Submit rating
      const ratingResponse = await dispatch(
        createRating({
          productId: product.id,
          rating: rating,
        })
      );

      if (ratingResponse.success) {
        setSubmitStatus((prev) => ({ ...prev, rating: true }));
      }

      // Submit review
      const reviewResponse = await dispatch(
        createReview({
          productId: product.id,
          review: review.trim(),
        })
      );

      if (reviewResponse.success) {
        setSubmitStatus((prev) => ({ ...prev, review: true }));
      }

      // If both successful, close modal after a short delay
      if (ratingResponse.success && reviewResponse.success) {
        setTimeout(() => {
          handleClose();
        }, 1500);
      }
    } catch (error) {
      console.error("Error submitting rating/review:", error);
    }
  };

  const handleClose = () => {
    setRating(0);
    setReview("");
    setErrors({ rating: "", review: "" });
    setSubmitStatus({ rating: false, review: false });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2" fontWeight="bold">
            Rate & Review Product
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Product Info */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            p: 2,
            bgcolor: "grey.50",
            borderRadius: 1,
          }}
        >
          <img
            src={product?.imageUrl}
            alt={product?.title}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="semibold">
              {product?.brand}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product?.title}
            </Typography>
          </Box>
        </Box>

        {/* Rating Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="semibold" mb={1}>
            Your Rating *
          </Typography>
          <Rating
            name="product-rating"
            value={rating}
            size="large"
            onChange={(event, newValue) => {
              setRating(newValue);
              setErrors((prev) => ({ ...prev, rating: "" }));
            }}
          />
          {errors.rating && (
            <Typography
              variant="caption"
              color="error"
              display="block"
              mt={0.5}
            >
              {errors.rating}
            </Typography>
          )}
        </Box>

        {/* Review Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="semibold" mb={1}>
            Your Review *
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Share your experience with this product..."
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
              setErrors((prev) => ({ ...prev, review: "" }));
            }}
            error={!!errors.review}
            helperText={errors.review}
          />
        </Box>

        {/* Success Messages */}
        {submitStatus.rating && submitStatus.review && (
          <Box sx={{ mb: 2, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
            <Typography variant="body2" color="success.dark">
              ✓ Rating and review submitted successfully!
            </Typography>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={ratingLoading || reviewLoading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={ratingLoading || reviewLoading}
            sx={{ bgcolor: "#9155fd", "&:hover": { bgcolor: "#7e3fd6" } }}
          >
            {ratingLoading || reviewLoading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RatingReviewModal;
