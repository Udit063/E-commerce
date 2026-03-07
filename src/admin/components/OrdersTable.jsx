import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getOrders,
  shipOrder,
} from "../../store/Admin/Order/Action";

const OrdersTable = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { adminOrder } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState([]);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 10;

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  useEffect(() => {
    // Reset to first page whenever orders are re-fetched due to a status change or delete
    setPage(0);
    //@ts-ignore
    dispatch(getOrders());
  }, [
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deletedOrder,
  ]);

  console.log("admin orders: ", adminOrder);

  // Slice orders into pages for client-side infinite scrolling
  useEffect(() => {
    const allOrders = adminOrder.orders || [];
    const sliceEnd = (page + 1) * PAGE_SIZE;
    setRows(allOrders.slice(0, sliceEnd));
    setHasMore(sliceEnd < allOrders.length);
  }, [adminOrder.orders, page]);

  // Infinite scroll on the main admin scroll container: load next page near bottom
  useEffect(() => {
    const container = document.querySelector(".admin-main-scroll");
    if (!container) return;

    const handleScroll = () => {
      if (!hasMore || adminOrder.loading) return;

      const { scrollTop, clientHeight, scrollHeight } = container;
      const threshold = 100; // px from bottom

      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, adminOrder.loading]);

  const handleShippedOrder = (orderId, index) => {
    //@ts-ignore
    dispatch(shipOrder(orderId));
    handleClose(index);
  };

  const handleConfirmedOrder = (orderId, index) => {
    //@ts-ignore
    dispatch(confirmOrder(orderId));
    handleClose(index);
  };

  const handleDeliveredOrder = (orderId, index) => {
    //@ts-ignore
    dispatch(deliverOrder(orderId));
    handleClose(index);
  };

  const handleDeleteOrder = (orderId) => {
    //@ts-ignore
    dispatch(deleteOrder(orderId));
  };

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                      {item.orderItems.map((orderItem) => (
                        <Avatar
                          src={orderItem.product.imageUrl}
                          alt="product"
                        ></Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="left">
                    {item.orderItems.map((orderItem) => (
                      <p>{orderItem.product.title}</p>
                    ))}
                  </TableCell>
                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="left">
                    {item.totalDiscountedPrice}
                  </TableCell>
                  <TableCell align="left">
                    <span
                      className={`px-5 py-2 text-white rounded-full ${
                        item.orderStatus === "CONFIRMED"
                          ? "bg-[#369236]"
                          : item.orderStatus === "SHIPPED"
                          ? "bg-[#4141FF]"
                          : item.orderStatus === "PLACED"
                          ? "bg-[#02B290]"
                          : item.orderStatus === "PENDING"
                          ? "bg-[gray]"
                          : "bg-[#025720]"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      id="basic-button"
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, index)}
                      aria-controls={`basic-menu-${item.id}`}
                      aria-expanded={Boolean(anchorEl[index])}
                    >
                      Status
                    </Button>
                    <Menu
                      id={`basic-menu-${item.id}`}
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => handleClose(index)}
                      slotProps={{
                        list: {
                          "aria-labelledby": "basic-button",
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => handleConfirmedOrder(item.id, index)}
                      >
                        Confirmed Order
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleShippedOrder(item.id, index)}
                      >
                        Shipped Order
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDeliveredOrder(item.id, index)}
                      >
                        Delivered Order
                      </MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => handleDeleteOrder(item.id)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdersTable;
