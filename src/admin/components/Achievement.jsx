import { Button, Card, CardContent, styled, Typography } from "@mui/material";

const TriangleImage = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

const TrophyImage = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

const Achievement = ({ statistics, onViewSales }) => {
  // Format revenue for display
  const formatRevenue = (amount) => {
    if (!amount && amount !== 0) return "0";
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toFixed(0);
  };

  const revenue = statistics?.totalRevenue;
  const displayRevenue = revenue !== undefined ? formatRevenue(revenue) : "0";

  return (
    <Card className="" sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Shop with Olevra
        </Typography>
        <Typography variant="body2">Congratulations 🥳</Typography>
        <Typography variant="h5" sx={{ my: 3.1 }}>
          ₹{displayRevenue} 🥳
        </Typography>
        <Button
          size="small"
          variant="contained"
          onClick={onViewSales}
          sx={{ bgcolor: "#9155fd" }}
        >
          View Sales
        </Button>
        <TriangleImage src="" />
        <TrophyImage src="https://imgs.search.brave.com/zDfQM7oKpKDoZqa8Th26EZxGJYX_ju6fW6QrT-I_QIo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDQv/MDE3Lzk5NC9zbWFs/bC9hd2FyZC10cm9w/aHktc3ltYm9sLW9m/LWFjaGlldmVtZW50/LWZyZWUtcG5nLnBu/Zw" />
      </CardContent>
    </Card>
  );
};

export default Achievement;
