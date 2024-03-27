import Meals from "@/components/meals/Meals";
import { getFavoriteMeals } from "@/lib/db";

const Favorites = () => {
  const favoriteMeals = getFavoriteMeals(1);

  return (
    <div className="d-flex mt-5">
      <Meals meals={favoriteMeals} favMealPage={true} />
    </div>
  );
};

export default Favorites;
