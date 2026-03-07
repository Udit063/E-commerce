//@ts-nocheck
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/Product/Action";
import { navigation } from "../../customer/components/navigation/NavigationData";
import { filters } from "../../customer/components/Product/FilterData";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const initialProductData = {
  imageUrl: "",
  brand: "",
  title: "",
  color: "",
  discountedPrice: "",
  discountPercent: "",
  price: "",
  size: initialSizes,
  quantity: "",
  topLevelCategory: "",
  secondLevelCategory: "",
  thirdLevelCategory: "",
  description: "",
};

const getColorOptions = () => {
  const colorFilter = filters.find((f) => f.id === "color");
  return colorFilter ? colorFilter.options : [];
};

const calculateDiscountPercent = (price, discountedPrice) => {
  const priceNum = Number(price);
  const discountedNum = Number(discountedPrice);
  if (!priceNum || priceNum <= 0) return "";
  if (discountedNum < 0 || discountedNum > priceNum) return "";
  const discount = Math.round(((priceNum - discountedNum) / priceNum) * 100);
  return String(discount);
};

const calculateDiscountedPrice = (price, discountPercent) => {
  const priceNum = Number(price);
  const discountNum = Number(discountPercent);
  if (!priceNum || priceNum <= 0) return "";
  if (discountNum < 0 || discountNum > 100) return "";
  const discounted = Math.round(priceNum * (1 - discountNum / 100));
  return String(discounted);
};

const validateProduct = (data) => {
  const errors = {};

  const imageUrl = data.imageUrl?.trim() || "";
  if (!imageUrl) {
    errors.imageUrl = "Image URL is required";
  } else if (imageUrl.length > 300) {
    errors.imageUrl = "Image URL is too long (max 300 characters)";
  }

  const brand = data.brand?.trim() || "";
  if (!brand) errors.brand = "Brand is required";

  const title = data.title?.trim() || "";
  if (!title) errors.title = "Title is required";

  if (!data.color) errors.color = "Color is required";

  const priceNum = Number(data.price);
  if (!data.price && data.price !== 0) {
    errors.price = "Price is required";
  } else if (!Number.isFinite(priceNum) || priceNum <= 0) {
    errors.price = "Price must be greater than 0";
  }

  const discountedNum = Number(data.discountedPrice);
  if (!data.discountedPrice && data.discountedPrice !== 0) {
    errors.discountedPrice = "Discounted price is required";
  } else if (!Number.isFinite(discountedNum) || discountedNum < 0) {
    errors.discountedPrice = "Discounted price must be 0 or more";
  } else if (priceNum && discountedNum > priceNum) {
    errors.discountedPrice = "Discounted price cannot be greater than price";
  }

  const discountNum = Number(data.discountPercent);
  if (!data.discountPercent && data.discountPercent !== 0) {
    errors.discountPercent = "Discount is required";
  } else if (!Number.isFinite(discountNum) || discountNum < 0 || discountNum > 100) {
    errors.discountPercent = "Discount must be between 0 and 100";
  }

  const quantityNum = Number(data.quantity);
  if (!data.quantity && data.quantity !== 0) {
    errors.quantity = "Total quantity is required";
  } else if (!Number.isInteger(quantityNum) || quantityNum <= 0) {
    errors.quantity = "Total quantity must be a positive integer";
  }

  if (!data.topLevelCategory) errors.topLevelCategory = "Required";
  if (!data.secondLevelCategory) errors.secondLevelCategory = "Required";
  if (!data.thirdLevelCategory) errors.thirdLevelCategory = "Required";

  const description = data.description?.trim() || "";
  if (!description) {
    errors.description = "Description is required";
  } else if (description.length > 500) {
    errors.description = "Description is too long (max 500 characters)";
  }

  const sizeQuantityTotal = (data.size || []).reduce(
    (sum, s) => sum + Number(s.quantity || 0),
    0
  );

  if (quantityNum > 0 && sizeQuantityTotal !== quantityNum) {
    errors.quantity =
      "Sum of S / M / L quantities must be equal to total quantity";
  }

  (data.size || []).forEach((s, index) => {
    const name = s.name?.trim() || "";
    const qNum = Number(s.quantity);
    if (!name) {
      errors[`sizeName_${index}`] = "Size name is required";
    }
    if (s.quantity === "" || s.quantity === null || s.quantity === undefined) {
      errors[`sizeQty_${index}`] = "Size quantity is required";
    } else if (!Number.isInteger(qNum) || qNum < 0) {
      errors[`sizeQty_${index}`] = "Size quantity must be 0 or more";
    }
  });

  return errors;
};

const CreateProductForm = () => {
  const [productData, setProductData] = useState(initialProductData);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = showErrors ? validateProduct(productData) : {};
  const isFormValid = Object.keys(validateProduct(productData)).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => {
      let newState = {
        ...prevState,
        [name]: value,
      };
      // Reset third level category when top level category changes
      if (name === "topLevelCategory") {
        newState.thirdLevelCategory = "";
      }

      // Keep price, discountedPrice and discountPercent in sync
      if (name === "price" || name === "discountedPrice") {
        const price = name === "price" ? value : newState.price;
        const discounted =
          name === "discountedPrice" ? value : newState.discountedPrice;
        newState.discountPercent = calculateDiscountPercent(price, discounted);
      }

      if (name === "discountPercent") {
        const discounted = calculateDiscountedPrice(newState.price, value);
        newState.discountedPrice = discounted;
      }

      return newState;
    });
  };

  // Get third level category options based on selected top level category
  const getThirdLevelOptions = () => {
    if (!productData.topLevelCategory) return [];
    const category = navigation.categories.find(
      (cat) => cat.id === productData.topLevelCategory
    );
    if (!category) return [];
    const clothingSection = category.sections.find(
      (sec) => sec.id === "clothing"
    );
    return clothingSection ? clothingSection.items : [];
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateProduct(productData);
    if (Object.keys(validationErrors).length > 0) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    setSubmitting(true);
    try {
      //@ts-ignore
      await dispatch(createProduct(productData));
      setProductData(initialProductData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-10">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center"
      >
        Add New Product
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
              required
              error={Boolean(errors.imageUrl)}
              helperText={errors.imageUrl || ""}
              inputProps={{ maxLength: 300 }}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              required
              error={Boolean(errors.brand)}
              helperText={errors.brand || ""}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              required
              error={Boolean(errors.title)}
              helperText={errors.title || ""}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth error={Boolean(errors.color)}>
              <InputLabel>Color</InputLabel>
              <Select
                name="color"
                value={productData.color}
                label="Color"
                onChange={handleChange}
                required
              >
                {getColorOptions().map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
              required
              error={Boolean(errors.quantity)}
              helperText={errors.quantity || ""}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
              required
              error={Boolean(errors.price)}
              helperText={errors.price || ""}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
              required
              error={Boolean(errors.discountedPrice)}
              helperText={errors.discountedPrice || ""}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPercent"
              value={productData.discountPercent}
              onChange={handleChange}
              type="number"
              required
              error={Boolean(errors.discountPercent)}
              helperText={errors.discountPercent || ""}
            />
          </Grid>
          <Grid item size={{ xs: 6, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
                required
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={{ xs: 6, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
                required
              >
                <MenuItem value="clothing">Clothing</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={{ xs: 6, sm: 4 }}>
            <FormControl fullWidth disabled={!productData.topLevelCategory}>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
                required
              >
                {getThirdLevelOptions().map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              name="description"
              rows={3}
              onChange={handleChange}
              value={productData.description}
              required
              error={Boolean(errors.description)}
              helperText={errors.description || ""}
              inputProps={{ maxLength: 500 }}
            />
          </Grid>
          {productData.size.map((size, index) => (
            <Grid container item spacing={3}>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Size Name"
                  name="size"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                  error={Boolean(errors[`sizeName_${index}`])}
                  helperText={errors[`sizeName_${index}`] || ""}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                  error={Boolean(errors[`sizeQty_${index}`])}
                  helperText={errors[`sizeQty_${index}`] || ""}
                />
              </Grid>
            </Grid>
          ))}
          <Grid item size={{ xs: 12 }}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Add New Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
