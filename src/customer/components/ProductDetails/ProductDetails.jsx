//@ts-nocheck
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findProductById,
  getProductsByCategory,
  getProductRatings,
  getProductReviews,
} from "../../../store/Product/Action";
import { addItemToCart } from "../../../store/Cart/Action";
import HomeSectionCarousal from "../HomeSectionCarousal/HomeSectionCarousal";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    {
      id: "white",
      name: "White",
      classes: "bg-white checked:outline-gray-400",
    },
    {
      id: "gray",
      name: "Gray",
      classes: "bg-gray-200 checked:outline-gray-400",
    },
    {
      id: "black",
      name: "Black",
      classes: "bg-gray-900 checked:outline-gray-900",
    },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  // Sort sizes in standard order: S, M, L, XL, XXL, etc.
  const sortSizes = (sizes) => {
    if (!sizes || sizes.length === 0) return [];

    const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

    return [...sizes].sort((a, b) => {
      const indexA = sizeOrder.indexOf(a.name.toUpperCase());
      const indexB = sizeOrder.indexOf(b.name.toUpperCase());

      // If both sizes are in the order array, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // If only one is in the order array, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      // If neither is in the order array, sort alphabetically
      return a.name.localeCompare(b.name);
    });
  };

  // Get sorted sizes
  const sortedSizes = products.product?.sizes
    ? sortSizes(products.product.sizes)
    : [];

  // Get available quantity for selected size
  const getAvailableQuantity = () => {
    if (!products.product?.sizes || !selectedSize) return 0;
    const sizeObj = products.product.sizes.find((s) => s.name === selectedSize);
    return sizeObj?.quantity || 0;
  };

  const availableQuantity = getAvailableQuantity();
  const isOutOfStock = availableQuantity === 0;

  // Set initial size when product loads (select first available size)
  useEffect(() => {
    if (sortedSizes.length > 0 && !selectedSize) {
      // Find first available size, or just use the first one
      const firstAvailable =
        sortedSizes.find((s) => s.quantity > 0) || sortedSizes[0];
      if (firstAvailable) {
        setSelectedSize(firstAvailable.name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedSizes]);

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    const data = {
      productId: Number(params.productId),
      size: selectedSize,
      quantity: 1, // Always add 1 item, user can increase quantity in cart
    };

    dispatch(addItemToCart(data));
    navigate("/cart");
  };

  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductById(data));
  }, [params.productId]);

  useEffect(() => {
    if (products.product?.category?.name) {
      dispatch(getProductsByCategory(products.product.category.name));
    }
  }, [products.product?.category?.name, dispatch]);

  // Fetch ratings and reviews when product is loaded
  useEffect(() => {
    if (params.productId) {
      dispatch(getProductRatings(params.productId));
      dispatch(getProductReviews(params.productId));
    }
  }, [params.productId, dispatch]);

  const similarProducts =
    products.productsByCategory?.[products.product?.category?.name]
      ?.filter((item) => item.id !== products.product?.id)
      .slice(0, 10) || [];

  // Calculate rating statistics
  const calculateRatingStats = () => {
    const product = products.product;

    const ratings = Array.isArray(product?.ratings) ? product.ratings : [];

    if (ratings.length === 0) {
      return {
        average: 0,
        total: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;

    ratings.forEach((item) => {
      const rating = Math.round(item.rating || 0);
      distribution[rating] = (distribution[rating] || 0) + 1;
      sum += item.rating || 0;
    });

    return {
      average: (sum / ratings.length).toFixed(1),
      total: ratings.length,
      distribution,
    };
  };

  const ratingStats = calculateRatingStats();

  // Calculate percentage for each rating category
  const getRatingPercentage = (count) => {
    if (ratingStats.total === 0) return 0;
    return Math.round((count / ratingStats.total) * 100);
  };

  // Combine ratings and reviews by matching user
  const getCombinedReviews = () => {
    const product = products.product;
    if (!product) return [];

    const ratings = product.ratings || [];
    const reviews = product.reviews || [];

    return reviews?.map((review) => {
      const userRating = ratings.find((r) => r.user.id === review.user.id);
      return {
        ...review,
        rating: userRating?.rating || 0,
      };
    });
  };

  const combinedReviews = getCombinedReviews();

  return (
    <div className="bg-white lg:px-12">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gay-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                alt={products.product?.imageUrl}
                src={products.product?.imageUrl}
                className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {/* {product.images.slice(1).map((item, index) => (
                <div
                  key={index}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
                  />
                </div>
              ))} */}
            </div>
          </div>
          {/* Product info */}
          <div className="lg:col-span-1 max-h-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {products.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                {products.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center space-x-5 text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold">
                  ₹{products.product?.discountedPrice}
                </p>
                <p className="opacity-50 line-through">
                  ₹{products.product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {products.product?.discountPercent}% off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={parseFloat(ratingStats.average)}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-50 text-sm">
                    {ratingStats.total} Ratings
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {combinedReviews.length} Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <div className="grid grid-cols-4 gap-3">
                      {sortedSizes.map((size) => {
                        const sizeQuantity = size.quantity || 0;
                        const isSizeOutOfStock = sizeQuantity === 0;
                        const isSelected = selectedSize === size.name;

                        return (
                          <label
                            key={size.name}
                            aria-label={size.name}
                            className={`group relative flex flex-col items-center justify-center rounded-md border p-3 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 cursor-pointer ${
                              isSizeOutOfStock
                                ? "border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed"
                                : isSelected
                                ? "ring-2 ring-indigo-600 border-indigo-600 bg-white"
                                : "border-gray-300 bg-white hover:border-indigo-300"
                            }`}
                          >
                            <input
                              value={size.name}
                              checked={isSelected}
                              name="size"
                              type="radio"
                              onChange={() =>
                                !isSizeOutOfStock && setSelectedSize(size.name)
                              }
                              disabled={isSizeOutOfStock}
                              className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                            />
                            <span
                              className={`text-sm font-medium uppercase ${
                                isSelected ? "text-indigo-600" : "text-gray-900"
                              }`}
                            >
                              {size.name}
                            </span>
                            {isSizeOutOfStock && (
                              <span className="text-xs text-red-600 mt-1">
                                Out of Stock
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Stock Availability Display */}
                  {selectedSize && (
                    <div className="mt-6">
                      {isOutOfStock ? (
                        <span className="text-sm font-medium text-red-600">
                          Out of Stock
                        </span>
                      ) : (
                        <span className="text-sm text-gray-600">
                          {availableQuantity} available in stock
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || !selectedSize}
                  variant="contained"
                  sx={{
                    px: "2rem",
                    py: "1rem",
                    my: "1rem",
                    bgcolor: "#9155fd",
                    "&:disabled": {
                      bgcolor: "#d1d5db",
                      color: "#9ca3af",
                    },
                  }}
                >
                  {isOutOfStock ? "Out of Stock" : "Add To Cart"}
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ratings and Reviews */}
        <section>
          <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid size={{ xs: 12, md: 7 }}>
                <div className="space-y-5">
                  {products.reviewsLoading ? (
                    <p className="text-center py-5">Loading reviews...</p>
                  ) : combinedReviews.length > 0 ? (
                    combinedReviews?.map((review) => (
                      <ProductReviewCard key={review.id} review={review} />
                    ))
                  ) : (
                    <p className="text-center py-5 text-gray-500">
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}
                </div>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <h1 className="text-xl font-semibold pb-2">Product Ratings</h1>
                <div className="flex items-center space-x-3">
                  <Rating
                    value={parseFloat(ratingStats.average)}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-60">{ratingStats.total} Ratings</p>
                </div>
                <Box className="mt-5 space-y-3">
                  <Grid container alignItems="center" gap={2}>
                    <Grid size={{ xs: 2 }}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={getRatingPercentage(ratingStats.distribution[5])}
                        color="success"
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <p className="text-sm opacity-60">
                        {ratingStats.distribution[5]}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid size={{ xs: 2 }}>
                      <p>Very Good</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={getRatingPercentage(ratingStats.distribution[4])}
                        color="success"
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <p className="text-sm opacity-60">
                        {ratingStats.distribution[4]}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid size={{ xs: 2 }}>
                      <p>Good</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={getRatingPercentage(ratingStats.distribution[3])}
                        color="info"
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <p className="text-sm opacity-60">
                        {ratingStats.distribution[3]}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid size={{ xs: 2 }}>
                      <p>Average</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={getRatingPercentage(ratingStats.distribution[2])}
                        color="warning"
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <p className="text-sm opacity-60">
                        {ratingStats.distribution[2]}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid size={{ xs: 2 }}>
                      <p>Poor</p>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={getRatingPercentage(ratingStats.distribution[1])}
                        color="error"
                      />
                    </Grid>
                    <Grid size={{ xs: 2 }}>
                      <p className="text-sm opacity-60">
                        {ratingStats.distribution[1]}
                      </p>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="pt-10">
            <HomeSectionCarousal
              data={similarProducts}
              sectionName="Similar Products"
            />
          </section>
        )}
      </div>
    </div>
  );
};
