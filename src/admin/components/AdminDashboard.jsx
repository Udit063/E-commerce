//@ts-nocheck
import { Grid } from "@mui/material";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";
import ProductsTable from "./ProductsTable";

const AdminDashboard = () => {
  return (
    <div className="p-10">
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Achievement />
        </Grid>
        <Grid item size={{ xs: 12, md: 8 }}>
          <MonthlyOverview />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <ProductsTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
