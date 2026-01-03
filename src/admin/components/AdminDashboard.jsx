//@ts-nocheck
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrdertableView from "../view/OrderTableView";
import ProductTableView from "../view/ProductTableView";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";
import { getOrderStatistics } from "../../store/Admin/Order/Action";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(false);
  //@ts-ignore
  const { adminOrder } = useSelector((store) => store);

  const fetchStatistics = useCallback(async () => {
    setDataLoaded(false);
    const result = await dispatch(getOrderStatistics());
    if (result?.success) {
      setDataLoaded(true);
    } else {
      // Even on error, stop showing loader
      setDataLoaded(true);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  const handleViewSales = () => {
    navigate("/admin/orders");
  };

  // Show loading until data is loaded
  const isLoading = !dataLoaded || adminOrder.statisticsLoading;

  // Show full-page loader
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={50} sx={{ color: "#9155fd" }} />
        <Typography variant="h6" sx={{ mt: 2, color: "gray" }}>
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <div className="p-10">
      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <div className="shadow-lg shadow-gray-600">
            <Achievement
              statistics={adminOrder.statistics}
              onViewSales={handleViewSales}
            />
          </div>
        </Grid>
        <Grid item size={{ xs: 12, md: 8 }}>
          <div className="shadow-lg shadow-gray-600">
            <MonthlyOverview statistics={adminOrder.statistics} />
          </div>
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <div className="shadow-lg shadow-gray-600">
            <OrdertableView />
          </div>
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <div className="shadow-lg shadow-gray-600">
            <ProductTableView />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
