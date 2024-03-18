import "./searchMeals.css";
import Meals from "../meals/Meals";

const SearchMeals = ({ searchedMeals }) => {
  return (
    <div className="position-absolute myModal">
      {searchedMeals.length === 0 && (
        <h1 className="text-center text-white mt-5">
          There is no result for your search!
        </h1>
      )}

      <Meals meals={searchedMeals} searchModal={true} />
    </div>
  );
};

export default SearchMeals;
