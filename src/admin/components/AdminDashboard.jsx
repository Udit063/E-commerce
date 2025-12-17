//@ts-nocheck
import { Grid } from "@mui/material";
import OrdertableView from "../view/OrderTableView";
import ProductTableView from "../view/ProductTableView";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";

const AdminDashboard = () => {
  return (
    <div className="p-10">
      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <div className="shadow-lg shadow-gray-600">
            <Achievement />
          </div>
        </Grid>
        <Grid item size={{ xs: 12, md: 8 }}>
          <div className="shadow-lg shadow-gray-600">
            <MonthlyOverview />
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
