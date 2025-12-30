//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getOrderById } from "../../../store/Order/Action";
import RatingReviewModal from "./RatingReviewModel";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  //@ts-ignore
  const { order } = useSelector((store) => store);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState(null);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);

  const getActiveStep = (orderStatus) => {
    switch (orderStatus) {
      case "PLACED":
        return 0;
      case "CONFIRMED":
        return 1;
      case "SHIPPED":
        return 2;
      case "OUT_FOR_DELIVERY":
        return 3;
      case "DELIVERED":
        return 4;
      default:
        return 0;
    }
  };

  const handleOpenModal = (product, orderItemId) => {
    setSelectedProduct(product);
    setSelectedOrderItemId(orderItemId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    setSelectedOrderItemId(null);
  };

  if (order.loading) {
    return (
      <div className="px-5 lg:px-20 py-10 text-center">
        Loading order details...
      </div>
    );
  }

  if (!order.order) {
    return (
      <div className="px-5 lg:px-20 py-10 text-center">Order not found</div>
    );
  }

  const orderData = order.order;

  return (
    <div className="px-5 lg:px-20">
      <div>
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressCard address={orderData.shippingAddress} />
      </div>
      <div className="py-20">
        <OrderTracker activeStep={getActiveStep(orderData.orderStatus)} />
      </div>
      <Grid container className="space-y-5 font-normal">
        {orderData.orderItems?.map((orderItem, index) => (
          <Grid
            key={orderItem.id || index}
            container
            className="shadow-xl rounded-md p-5 border w-full"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid size={{ xs: 6 }}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={
                    orderItem.product?.imageUrl ||
                    "https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70"
                  }
                  alt={orderItem.product?.title || "Product"}
                />
                <div className="space-y-2 ml-5">
                  <p className="font-semibold">{orderItem.product?.title}</p>
                  <p className="space-x-5 opacity-50 text-xs font-semibold">
                    <span>Color: {orderItem.product?.color}</span>
                    <span>Size: {orderItem.size}</span>
                  </p>
                  <p className="opacity-70 mt-1">
                    Quantity: {orderItem.quantity}
                  </p>
                  <p>₹{orderItem.discountedPrice || orderItem.price}</p>
                </div>
              </div>
            </Grid>
            <Grid>
              <Box
                sx={{ color: deepPurple[500], cursor: "pointer" }}
                onClick={() => handleOpenModal(orderItem.product, orderItem.id)}
              >
                <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2" />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>

      {/* Rating & Review Modal */}
      {selectedProduct && (
        <RatingReviewModal
          open={modalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          orderItemId={selectedOrderItemId}
        />
      )}
    </div>
  );
};

export default OrderDetails;
