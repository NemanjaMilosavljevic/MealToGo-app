import Meals from "@/components/Meals";
import FilterCard from "@/components/filter section/filterCard";

const Menu = () => {
  return (
    <div className="d-flex">
      <FilterCard />
      <Meals />
    </div>
  );
};

export default Menu;
