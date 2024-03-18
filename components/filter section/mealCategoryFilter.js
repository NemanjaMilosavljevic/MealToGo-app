"use client";

import MealCategory from "./mealCategory";
import MealSubcategory from "./mealSubcategory";
import { usePathname } from "next/navigation";

const MealCategoryFilter = () => {
  const path = usePathname();
  const categories = path.slice(1).split("/");

  return (
    <>
      {categories.length === 1 || categories[1] !== "main-dishes" ? (
        <MealCategory categories={categories} />
      ) : (
        <MealSubcategory categories={categories} />
      )}
    </>
  );
};

export default MealCategoryFilter;
