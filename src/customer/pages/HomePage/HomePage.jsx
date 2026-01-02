//@ts-nocheck
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousal from "../../components/HomeSectionCarousal/HomeSectionCarousal";
import { getProductsByCategory } from "../../../store/Product/Action";
import { useAuth } from "../../../context/AuthContext";

const categories = [
  { name: "mens_kurta", displayName: "Men's Kurta" },
  { name: "mens_shoes", displayName: "Men's Shoes" },
  { name: "womens_saree", displayName: "Women's Saree" },
  { name: "womens_dress", displayName: "Women's Dress" },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { handleOpenAuthModal } = useAuth();
  //@ts-ignore
  const { products, auth } = useSelector((store) => store);

  useEffect(() => {
    categories.forEach((category) => {
      // Only fetch if not already loaded
      if (!products.productsByCategory?.[category.name]) {
        dispatch(getProductsByCategory(category.name));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Open auth modal when on /login or /register routes if user is not logged in
  useEffect(() => {
    if (
      (location.pathname === "/login" || location.pathname === "/register") &&
      !auth.user
    ) {
      handleOpenAuthModal();
    }
  }, [location.pathname, auth.user, handleOpenAuthModal]);

  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        {categories.map((category) => {
          const categoryProducts =
            products.productsByCategory?.[category.name] || [];
          return (
            <HomeSectionCarousal
              key={category.name}
              data={categoryProducts}
              sectionName={category.displayName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
