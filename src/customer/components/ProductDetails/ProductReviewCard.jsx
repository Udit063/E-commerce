//@ts-nocheck
import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = ({ review }) => {
  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get initials for avatar
  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0)?.toUpperCase() || "";
    const last = lastName?.charAt(0)?.toUpperCase() || "";
    return `${first}${last}`;
  };

  return (
    <div className="border rounded-lg p-5 shadow-sm">
      <Grid container spacing={2} gap={3}>
        <Grid size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              {getInitials(review?.user?.firstName, review?.user?.lastName)}
            </Avatar>
          </Box>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">
                {review?.user?.firstName} {review?.user?.lastName}
              </p>
              <p className="opacity-70 text-sm">
                {formatDate(review?.createdAt)}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <Rating
              value={review?.rating || 0}
              name="half-rating"
              readOnly
              precision={0.5}
            />
          </div>
          <p className="mt-3 text-gray-700">{review?.review}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
