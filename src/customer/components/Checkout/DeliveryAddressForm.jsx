//@ts-nocheck
import { Box, Button, Grid, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../store/Order/Action";
import AddressCard from "../AddressCard/AddressCard";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
  });

  //@ts-ignore
  const { auth } = useSelector((store) => store);

  // Validation functions
  const validatePhoneNumber = (phone) => {
    // Remove spaces, dashes, and parentheses
    const cleaned = phone.replace(/[\s\-\(\)]/g, "");
    // Check if it's 10 digits (for most countries) or 10-15 digits (international)
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(cleaned);
  };

  const validateZipCode = (zip) => {
    // Check if it's numeric and has reasonable length (4-10 digits)
    const zipRegex = /^[0-9]{4,10}$/;
    return zipRegex.test(zip);
  };

  const validateString = (value) => {
    // Check if it's a non-empty string with only letters, spaces, hyphens, and apostrophes
    const stringRegex = /^[a-zA-Z\s\-']+$/;
    return value.trim().length > 0 && stringRegex.test(value.trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    // Update address state as user types
    setAddress((prev) => {
      const updated = { ...prev };
      if (name === "phoneNumber") {
        updated.mobile = value;
      } else if (name === "zip") {
        updated.zipCode = value;
      } else if (name === "address") {
        updated.streetAddress = value;
      } else {
        updated[name] = value;
      }
      return updated;
    });

    switch (name) {
      case "phoneNumber":
        if (value && !validatePhoneNumber(value)) {
          error = "Please enter a valid phone number (10-15 digits)";
        }
        break;
      case "zip":
        if (value && !validateZipCode(value)) {
          error = "Please enter a valid zip code (4-10 digits)";
        }
        break;
      case "city":
        if (value && !validateString(value)) {
          error = "City should contain only letters";
        }
        break;
      case "state":
        if (value && !validateString(value)) {
          error = "State should contain only letters";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const phoneNumber = String(data.get("phoneNumber") || "");
    const zip = String(data.get("zip") || "");
    const city = String(data.get("city") || "");
    const state = String(data.get("state") || "");

    // Validate all fields
    const newErrors = {};
    let isValid = true;

    if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber =
        "Please enter a valid phone number (10-15 digits)";
      isValid = false;
    }

    if (!validateZipCode(zip)) {
      newErrors.zip = "Please enter a valid zip code (4-10 digits)";
      isValid = false;
    }

    if (!validateString(city)) {
      newErrors.city = "City should contain only letters";
      isValid = false;
    }

    if (!validateString(state)) {
      newErrors.state = "State should contain only letters";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    const address = {
      firstName: String(data.get("firstName") || ""),
      lastName: String(data.get("lastName") || ""),
      streetAddress: String(data.get("address") || ""),
      city: city.trim(),
      state: state.trim(),
      zipCode: zip,
      mobile: phoneNumber.replace(/[\s\-\(\)]/g, ""), // Clean phone number
    };

    const orderData = { address, navigate };
    //@ts-ignore
    dispatch(createOrder(orderData));

    console.log("address: ", address);
  };
  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          size={{ xs: 12, lg: 5 }}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="px-5 py-7 border-b cursor-pointer">
            {address.firstName || address.streetAddress ? (
              <AddressCard address={address} />
            ) : (
              <div className="space-y-3">
                <p className="text-gray-500 text-sm">
                  Fill in the form to see your address preview
                </p>
              </div>
            )}
            <Button sx={{ mt: 2, bgcolor: "RGB(145 85 253)", color: "white" }}>
              Delivery Here
            </Button>
          </div>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    value={address.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                    value={address.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="street-address"
                    multiline
                    rows={4}
                    value={address.streetAddress}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="address-level2"
                    error={!!errors.city}
                    helperText={errors.city}
                    value={address.city}
                    onChange={handleChange}
                    inputProps={{
                      pattern: "[a-zA-Z\\s\\-']+",
                      title: "City should contain only letters",
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="address-level1"
                    error={!!errors.state}
                    helperText={errors.state}
                    value={address.state}
                    onChange={handleChange}
                    inputProps={{
                      pattern: "[a-zA-Z\\s\\-']+",
                      title: "State should contain only letters",
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    error={!!errors.zip}
                    helperText={errors.zip}
                    value={address.zipCode}
                    onChange={handleChange}
                    inputProps={{
                      pattern: "[0-9]{4,10}",
                      title: "Zip code should be 4-10 digits",
                      inputMode: "numeric",
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="tel"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    value={address.mobile}
                    onChange={handleChange}
                    inputProps={{
                      inputMode: "tel",
                      pattern: "[0-9\\s\\-\\(\\)]{10,15}",
                      title: "Phone number should be 10-15 digits",
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    sx={{
                      py: 1.5,
                      mt: 2,
                      bgcolor: "RGB(145 85 253)",
                      color: "white",
                    }}
                    type="submit"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
