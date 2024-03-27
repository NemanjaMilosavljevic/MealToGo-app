import Meals from "@/components/meals/Meals";
import FilterCard from "@/components/filter section/filterCard";
import { getMeals, filterMealsByQueryParams, getMaxPrice } from "@/lib/db";

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
    <div className="d-flex flex-column position-relative mt-5 container-fluid">
      <FilterCard />
      <Meals meals={meals} searchModal={false} favMealPage={false} />
    </div>
  );
};

export default Menu;
