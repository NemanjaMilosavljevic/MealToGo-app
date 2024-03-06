import Meals from "@/components/Meals";
import FilterCard from "@/components/filter section/filterCard";
import { getMeals, filterMealsByQueryParams, getMaxPrice } from "@/lib/meals";

const Menu = ({ searchParams }) => {
  let meals;
  if (JSON.stringify(searchParams) === "{}") {
    meals = getMeals();
  } else {
    meals = filterMealsByQueryParams(
      searchParams.vegge === "true",
      searchParams.fasting === "true",
      +searchParams.price?.split("-")[1] || getMaxPrice().price
    );
  }

  return (
    <div className="d-flex">
      <FilterCard />
      <Meals meals={meals} />
    </div>
  );
};

export default Menu;
