import Filter from "./filter";
import MealCategoryFilter from "./mealCategoryFilter";
import Breadcrumb from "./breadcrumb";
import "./filterCard.css";
import { getMinPrice, getMaxPrice } from "@/lib/db";

const FilterCard = () => {
  const minPrice = getMinPrice().price;
  const maxPrice = getMaxPrice().price;

  return (
    <div className="filterCard">
      <Breadcrumb />
      <MealCategoryFilter />
      <Filter minPrice={minPrice} maxPrice={maxPrice} />
    </div>
  );
};

export default FilterCard;
