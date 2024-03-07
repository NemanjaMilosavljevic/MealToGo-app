import Meals from "@/components/meals/Meals";
import FilterCard from "@/components/filter section/filterCard";
import { getMeals, filterMealsByQueryParams, getMaxPrice } from "@/lib/meals";

const Menu = ({ searchParams }) => {
  const price = searchParams.price?.includes("-")
    ? +searchParams.price?.split("-")[1]
    : +searchParams.price || getMaxPrice().price;

  let meals;
  if (JSON.stringify(searchParams) === "{}") {
    meals = getMeals();
  } else {
    meals = filterMealsByQueryParams(
      searchParams.vegge === "true",
      searchParams.fasting === "true",
      price
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
