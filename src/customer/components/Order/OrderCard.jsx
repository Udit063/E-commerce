import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";

const OrderCard = () => {
  return (
    <div className="p-5 shadow-md  hover:shadow-2xl border">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid className="font-normal" size={{ xs: 6 }}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
              alt=""
            />
            <div className="ml-5 space-y-2">
              <p className="mb-2">Two each of gray, white, and black shirts</p>
              <p className="opacity-50 text-xs font-semibold">Size: M</p>
              <p className="opacity-50 text-xs font-semibold">Color: Black</p>
            </div>
          </div>
        </Grid>
        <Grid className="font-normal" size={{ xs: 2 }}>
          <p>₹1099</p>
        </Grid>
        <Grid size={{ xs: 4 }}>
          {true && (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2 text-sm"
                />
                <span>Delivered on Mar 03</span>
              </p>
              <p className="text-xs">Your Item Has Been Delivered</p>
            </div>
          )}
          {false && (
            <p>
              <span>Expected Delivered on Mar 03</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
