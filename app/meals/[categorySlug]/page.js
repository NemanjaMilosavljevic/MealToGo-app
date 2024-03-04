import FilterCard from "@/components/filter section/filterCard";
import Meals from "@/components/Meals";
import { filterMealsByCategory } from "@/lib/meals";

const CategoryMeals = ({ params }) => {
  const filteredMeals = filterMealsByCategory(params.categorySlug);

  return (
    <div className="d-flex">
      <FilterCard />
      <Meals meals={filteredMeals} />
    </div>
  );
};

export default CategoryMeals;
