//@ts-nocheck
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousal from "../../components/HomeSectionCarousal/HomeSectionCarousal";
import { getProductsByCategory } from "../../../store/Product/Action";
import { useAuth } from "../../../context/AuthContext";
import { navigation } from "../../components/navigation/NavigationData";

// Extract all unique categories from NavigationData
const getCategoriesFromNavigation = () => {
  const categoryMap = new Map();

  navigation.categories.forEach((category) => {
    category.sections.forEach((section) => {
      section.items.forEach((item) => {
        // Use composite key to allow same item.id in different parent categories
        // e.g., "men-t-shirts" vs "women-t-shirts"
        const compositeKey = `${category.id}-${item.id}`;

        if (!categoryMap.has(compositeKey)) {
          categoryMap.set(compositeKey, {
            name: item.id,
            displayName: item.name,
            route: `/${category.id}/${section.id}/${item.id}`, // Route for navigation
            parentCategory: category.id, // men, women, or kids (not item.id!)
            storageKey: compositeKey, // Use composite key for Redux storage
          });
        }
      });
    });
  });

  return Array.from(categoryMap.values());
};

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { handleOpenAuthModal } = useAuth();
  //@ts-ignore
  const { products, auth } = useSelector((store) => store);

  // Get categories from NavigationData
  const categories = useMemo(() => getCategoriesFromNavigation(), []);

  useEffect(() => {
    categories.forEach((category) => {
      // Use storageKey (composite key) to store products separately for each parent category
      const storageKey = category.storageKey || category.name;
      if (!products.productsByCategory?.[storageKey]) {
        dispatch(
          getProductsByCategory(
            category.name,
            category.parentCategory,
            storageKey
          )
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, categories]);

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
          // Use storageKey to get the correct products for this parent category
          const storageKey = category.storageKey || category.name;
          const categoryProducts =
            products.productsByCategory?.[storageKey] || [];
          return (
            <HomeSectionCarousal
              key={storageKey}
              data={categoryProducts}
              sectionName={category.displayName}
              route={category.route}
              parentCategory={category.parentCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
