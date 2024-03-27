import FilterCard from "@/components/filter section/filterCard";
import Meals from "@/components/meals/Meals";
import {
  filterMealsByCategory,
  filterMealsByQueryParams,
  getMaxPrice,
} from "@/lib/db";

const CategoryMeals = ({ params, searchParams }) => {
  const price = searchParams.price?.includes("-")
    ? +searchParams.price?.split("-")[1]
    : +searchParams.price || getMaxPrice().price;
  let filteredMeals;
  if (JSON.stringify(searchParams) === "{}") {
    filteredMeals = filterMealsByCategory(params.categorySlug);
  } else {
    filteredMeals = filterMealsByQueryParams(
      searchParams.vegge === "true",
      searchParams.fasting === "true",
      price,
      params.categorySlug,
      "category"
    );
  }

  return (
    <div className="d-flex flex-column position-relative mt-5 container-fluid">
      <FilterCard />

      <Meals meals={filteredMeals} searchModal={false} favMealPage={false} />
    </div>
  );
};

export default CategoryMeals;
