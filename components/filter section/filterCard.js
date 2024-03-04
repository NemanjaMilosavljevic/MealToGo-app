import Filter from "./filter";
import MealCategoryFilter from "./mealCategoryFilter";
import Breadcrumb from "./breadcrumb";
import "./filterCard.css";

const FilterCard = () => {
  return (
    <div className="filterCard">
      <Breadcrumb />
      <MealCategoryFilter />
      <Filter />
    </div>
  );
};

export default FilterCard;
