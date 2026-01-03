import { Box, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        py: 4,
        mt: 10,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 4 },
          px: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
          &copy; {new Date().getFullYear()} All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
