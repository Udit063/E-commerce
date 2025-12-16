import {
  AccountCircle,
  AddCircle,
  Category,
  Dashboard,
  Dvr,
  PeopleAlt,
} from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useMediaQuery } from "@mui/system";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import CreateProductForm from "./components/CreateProductForm";
import CustomersTable from "./components/CustomersTable";
import OrdersTable from "./components/OrdersTable";
import ProductsTable from "./components/ProductsTable";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <Dashboard /> },
  { name: "Products", path: "/admin/products", icon: <Category /> },
  { name: "Customers", path: "/admin/customers", icon: <PeopleAlt /> },
  { name: "Orders", path: "/admin/orders", icon: <Dvr /> },
  { name: "Add Products", path: "/admin/product/create", icon: <AddCircle /> },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* {isLargeScreen && <Toolbar />} */}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      <div className="flex h-[100vh] overflow-hidden">
        <CssBaseline />
        <div className="w-[15%] border border-r-gray-300 h-full sticky top-0">{drawer}</div>
        <div className="w-[85%] h-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/product/create" element={<CreateProductForm />} />
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/orders" element={<OrdersTable />} />
            <Route path="/customers" element={<CustomersTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
