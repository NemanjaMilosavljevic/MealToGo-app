import FilterCard from "@/components/filterCard";
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
