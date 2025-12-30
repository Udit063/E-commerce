//@ts-nocheck
import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-600";
      case "SHIPPED":
        return "text-blue-600";
      case "CONFIRMED":
        return "text-purple-600";
      case "PLACED":
        return "text-yellow-600";
      case "CANCELLED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusMessage = (status, deliveryDate) => {
    switch (status) {
      case "DELIVERED":
        return {
          message: `Delivered on ${formatDate(deliveryDate)}`,
          subMessage: "Your Item Has Been Delivered",
        };
      case "SHIPPED":
        return {
          message: `Shipped on ${formatDate(order.orderDate)}`,
          subMessage: "Your Item Has Been Shipped",
        };
      case "CONFIRMED":
        return {
          message: `Confirmed on ${formatDate(order.orderDate)}`,
          subMessage: "Your Order Has Been Confirmed",
        };
      case "PLACED":
        return {
          message: `Placed on ${formatDate(order.orderDate)}`,
          subMessage: "Your Order Has Been Placed",
        };
      default:
        return {
          message: `Order ${status}`,
          subMessage: "",
        };
    }
  };

  const firstOrderItem = order?.orderItems?.[0];
  const statusInfo = getStatusMessage(order?.orderStatus, order?.deliveryDate);

  return (
    <div
      onClick={() => navigate(`/account/order/${order?.id}`)}
      className="p-5 shadow-md hover:shadow-2xl border cursor-pointer"
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid className="font-normal" size={{ xs: 6 }}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={
                firstOrderItem?.product?.imageUrl ||
                "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
              }
              alt={firstOrderItem?.product?.title || "Product"}
            />
            <div className="ml-5 space-y-2">
              <p className="mb-2">
                {order?.orderItems?.length > 1
                  ? `${firstOrderItem?.product?.title} and ${
                      order.orderItems.length - 1
                    } more item(s)`
                  : firstOrderItem?.product?.title || "Product"}
              </p>
              {firstOrderItem && (
                <>
                  <p className="opacity-50 text-xs font-semibold">
                    Size: {firstOrderItem.size}
                  </p>
                  <p className="opacity-50 text-xs font-semibold">
                    Color: {firstOrderItem.product.color}
                  </p>
                </>
              )}
            </div>
          </div>
        </Grid>
        <Grid className="font-normal" size={{ xs: 2 }}>
          <p>₹{order?.totalDiscountedPrice || order?.totalPrice || 0}</p>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <div>
            <p>
              <AdjustIcon
                sx={{ width: "15px", height: "15px" }}
                className={`${getStatusColor(order?.orderStatus)} mr-2 text-sm`}
              />
              <span>{statusInfo.message}</span>
            </p>
            {statusInfo.subMessage && (
              <p className="text-xs">{statusInfo.subMessage}</p>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
