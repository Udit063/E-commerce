//@ts-nocheck
import {
  Box,
  Link,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    // { name: "Home", path: "/" },
    { name: "Women", path: "/women/clothing/top" },
    { name: "Men", path: "/men/clothing/mens_kurta" },
    { name: "Kids", path: "/kids/clothing/t-shirts" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#1a1a1a",
        color: "white",
        mt: 10,
        width: "100%",
      }}
    >
      {/* Main Footer Content */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 3, sm: 4, md: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                <img
                  src="https://res.cloudinary.com/ddkso1wxi/image/upload/v1675919455/Logo/Copy_of_Zosh_Academy_nblljp.png"
                  alt="Olevra"
                  style={{ height: "32px", width: "32px", marginRight: "8px" }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.25rem",
                    color: "white",
                  }}
                >
                  Olevra
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                Your one-stop destination for trendy fashion. Discover the
                latest styles in clothing for women, men, and kids.
              </Typography>
              {/* <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <IconButton
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  size="small"
                >
                  <Facebook fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  size="small"
                >
                  <Instagram fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  size="small"
                >
                  <Twitter fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  size="small"
                >
                  <YouTube fontSize="small" />
                </IconButton>
              </Box> */}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "1rem",
                color: "white",
              }}
            >
              Shop
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  component="button"
                  onClick={() => navigate(link.path)}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    textAlign: "left",
                    "&:hover": {
                      color: "white",
                      textDecoration: "underline",
                    },
                    cursor: "pointer",
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Account */}
          <Grid item xs={6} sm={4} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "1rem",
                color: "white",
              }}
            >
              Account
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                component="button"
                onClick={() => navigate("/account/order")}
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  textAlign: "left",
                  "&:hover": {
                    color: "white",
                    textDecoration: "underline",
                  },
                  cursor: "pointer",
                }}
              >
                My Orders
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider
          sx={{
            my: 4,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "0.875rem",
            }}
          >
            &copy; {new Date().getFullYear()} Olevra. All rights reserved.
          </Typography>

          {/* Payment Methods */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "0.75rem",
                mr: 1,
              }}
            >
              We accept:
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                flexWrap: "wrap",
              }}
            >
              {["Visa", "Mastercard", "PayPal", "Amex"].map((method) => (
                <Box
                  key={method}
                  sx={{
                    px: 1,
                    py: 0.5,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  {method}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
