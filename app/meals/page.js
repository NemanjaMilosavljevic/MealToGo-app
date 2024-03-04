import Meals from "@/components/Meals";
import FilterCard from "@/components/filterCard";

const Menu = () => {
  return (
    <div className="d-flex">
      <FilterCard />
      <Meals />
    </div>
  );
};

export default Menu;
