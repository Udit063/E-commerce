//@ts-nocheck
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../../store/Order/Action";
import OrderCard from "./OrderCard";

const orderStatus = [
  {
    label: "Placed",
    value: "PLACED",
  },
  {
    label: "Confirmed",
    value: "CONFIRMED",
  },
  {
    label: "Shipped",
    value: "SHIPPED",
  },
  {
    label: "Delivered",
    value: "DELIVERED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

const Order = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { order } = useSelector((store) => store);
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const handleStatusChange = (statusValue) => {
    setSelectedStatus((prev) =>
      prev.includes(statusValue)
        ? prev.filter((s) => s !== statusValue)
        : [...prev, statusValue]
    );
  };

  const filteredOrders =
    selectedStatus.length > 0
      ? order.orders.filter((orderItem) =>
          selectedStatus.includes(orderItem.orderStatus)
        )
      : order.orders;

  return (
    <div className="px-5 lg:px-20">
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid size={{ xs: 2.5 }}>
          <div className="h-auth shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">Order Status</h1>
              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    checked={selectedStatus.includes(option.value)}
                    onChange={() => handleStatusChange(option.value)}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    className="ml-3 text-sm text-gray-600"
                    htmlFor={option.value}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <div className="space-y-5">
            {order.loading ? (
              <div className="text-center py-10">Loading orders...</div>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((orderItem) => (
                <OrderCard key={orderItem.id} order={orderItem} />
              ))
            ) : (
              <div className="text-center py-10">No orders found</div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
