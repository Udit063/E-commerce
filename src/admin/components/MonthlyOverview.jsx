import {
  AccountCircle,
  AttachMoney,
  SettingsCell,
  TrendingUp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

const formatNumber = (num) => {
  if (!num && num !== 0) return "0";
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "₹0";
  if (amount >= 1000000) {
    return `₹${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount.toFixed(0)}`;
};

const MonthlyOverview = ({ statistics }) => {
  const salesData = [
    {
      stats:
        statistics?.totalSales !== undefined
          ? formatCurrency(statistics.totalSales)
          : "₹0",
      title: "Sales",
      color: "#E5D68A",
      icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats:
        statistics?.totalCustomers !== undefined
          ? formatNumber(statistics.totalCustomers)
          : "0",
      title: "Customers",
      color: "#22CB5C",
      icon: <AccountCircle sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats:
        statistics?.totalProducts !== undefined
          ? formatNumber(statistics.totalProducts)
          : "0",
      title: "Products",
      color: "#DE4839",
      icon: <SettingsCell sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats:
        statistics?.totalRevenue !== undefined
          ? formatCurrency(statistics.totalRevenue)
          : "₹0",
      title: "Revenue",
      color: "#12B0E8",
      icon: <AttachMoney sx={{ fontSize: "1.75rem" }} />,
    },
  ];

  const renderState = () => {
    return salesData.map((item, index) => (
      //@ts-ignore
      <Grid item size={{ xs: 12, sm: 3 }} key={index}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            variant="rounded"
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: "white",
              background: `${item.color}`,
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">{item.title}</Typography>
            <Typography variant="h6">{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };

  return (
    <Card>
      <CardHeader
        title="Monthly Overview"
        subheader={
          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600 }}>
              Total {statistics?.totalOrders ?? 0} orders 😎
            </Box>{" "}
            this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: ".15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderState()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
