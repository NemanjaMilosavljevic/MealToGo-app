import "./searchMeals.css";
import Meals from "../meals/Meals";

const SearchMeals = ({ searchedMeals }) => {
  return (
    <div className="position-absolute myModal">
      {searchedMeals.length === 0 && (
        <h1 className="text-center mt-5">
          There is no meal that includes characters you search for in meal
          title!
        </h1>
      )}

      <Meals meals={searchedMeals} />
    </div>
  );
};

export default SearchMeals;
