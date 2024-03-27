import "./searchMeals.css";
import Meals from "../meals/Meals";

const SearchMeals = ({ searchedMeals }) => {
  return (
    <div className={`position-fixed searchModal`}>
      <Meals meals={searchedMeals} searchModal={true} />
    </div>
  );
};

export default SearchMeals;
