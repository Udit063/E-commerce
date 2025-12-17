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

const OrdertableView = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    //@ts-ignore
    dispatch(getOrders());
  }, [
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deletedOrder,
  ]);

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="Recent Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.map((item, index) => (
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
                  <TableCell align="left">{item.totalPrice}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdertableView;
