import Meals from "@/components/Meals";
import FilterCard from "@/components/filter section/filterCard";
import { getMeals } from "@/lib/meals";

const Menu = () => {
  const meals = getMeals();

  return (
    <div className="d-flex">
      <FilterCard />
      <Meals meals={meals} />
    </div>
  );
};

export default Menu;
