import FilterCard from "@/components/filter section/filterCard";
import Meals from "@/components/Meals";

const Meal = () => {
  return (
    <div className="d-flex">
      <FilterCard />
      <Meals />
    </div>
  );
};

export default Meal;
