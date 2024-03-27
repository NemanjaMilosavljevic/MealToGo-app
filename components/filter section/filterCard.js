import Filter from "./filter";
import MealCategoryFilter from "./mealCategoryFilter";
import Breadcrumb from "./breadcrumb";
import "./filterCard.css";
import { getMinPrice, getMaxPrice } from "@/lib/db";

const FilterCard = () => {
  const minPrice = getMinPrice().price;
  const maxPrice = getMaxPrice().price;

  return (
    <div className="filterCard d-flex flex-column gap-2">
      <div>
        <Breadcrumb />
      </div>
      <div className="d-flex flex-md-column gap-2 gap-md-1">
        <MealCategoryFilter />
        <Filter minPrice={minPrice} maxPrice={maxPrice} />
      </div>
    </div>
  );
};

export default FilterCard;
