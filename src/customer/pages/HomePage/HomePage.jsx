//@ts-nocheck
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousal from "../../components/HomeSectionCarousal/HomeSectionCarousal";
import { getProductsByCategory } from "../../../store/Product/Action";

const categories = [
  { name: "mens_kurta", displayName: "Men's Kurta" },
  { name: "mens_shoes", displayName: "Men's Shoes" },
  { name: "womens_saree", displayName: "Women's Saree" },
  { name: "womens_dress", displayName: "Women's Dress" },
];

const HomePage = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { products } = useSelector((store) => store);

  useEffect(() => {
    categories.forEach((category) => {
      // Only fetch if not already loaded
      if (!products.productsByCategory?.[category.name]) {
        dispatch(getProductsByCategory(category.name));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
