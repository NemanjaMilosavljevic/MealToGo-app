import FilterCard from "@/components/filter section/filterCard";
import Meals from "@/components/Meals";

const Category = () => {
  return (
    <div className="d-flex">
      <FilterCard />
      <Meals />
    </div>
  );
};

export default Category;
