import FilterCard from "@/components/filter section/filterCard";
import Meals from "@/components/Meals";
import {
  filterMealsBySubcategory,
  getMaxPrice,
  filterMealsByQueryParams,
} from "@/lib/meals";

const SubcategoryMeals = ({ params, searchParams }) => {
  const price = searchParams.price?.includes("-")
    ? +searchParams.price?.split("-")[1]
    : +searchParams.price || getMaxPrice().price;

  let filteredMeals;
  if (JSON.stringify(searchParams) === "{}") {
    filteredMeals = filterMealsBySubcategory(params.subcategorySlug);
  } else {
    filteredMeals = filterMealsByQueryParams(
      searchParams.vegge === "true",
      searchParams.fasting === "true",
      price,
      params.subcategorySlug,
      "subcategory"
    );
  }
  return (
    <div className="d-flex">
      <FilterCard />
      <Meals meals={filteredMeals} />
    </div>
  );
};

export default SubcategoryMeals;
