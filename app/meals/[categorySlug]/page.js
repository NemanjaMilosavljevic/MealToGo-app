import FilterCard from "@/components/filter section/filterCard";
import Meals from "@/components/Meals";
import {
  filterMealsByCategory,
  filterMealsByQueryParams,
  getMaxPrice,
} from "@/lib/meals";

const CategoryMeals = ({ params, searchParams }) => {
  let filteredMeals;
  if (JSON.stringify(searchParams) === "{}") {
    filteredMeals = filterMealsByCategory(params.categorySlug);
  } else {
    filteredMeals = filterMealsByQueryParams(
      searchParams.vegge === "true",
      searchParams.fasting === "true",
      +searchParams.price?.split("-")[1] || getMaxPrice().price,
      params.categorySlug,
      "category"
    );
  }

  return (
    <div className="d-flex">
      <FilterCard />
      <Meals meals={filteredMeals} />
    </div>
  );
};

export default CategoryMeals;
