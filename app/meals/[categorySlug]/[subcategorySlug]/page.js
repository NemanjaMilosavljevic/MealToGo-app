import FilterCard from "@/components/filter section/filterCard";
import Meals from "@/components/Meals";
import { filterMealsBySubcategory } from "@/lib/meals";

const SubcategoryMeals = ({ params }) => {
  const filteredMeals = filterMealsBySubcategory(params.subcategorySlug);

  return (
    <div className="d-flex">
      <FilterCard />
      <Meals meals={filteredMeals} />
    </div>
  );
};

export default SubcategoryMeals;
