import Meals from "@/components/meals/Meals";
import { getFavoriteMeals } from "@/lib/meals";

const Favorites = () => {
  const favoriteMeals = getFavoriteMeals(1);

  return (
    <>
      <h1>My Favorite Meals</h1>
      <Meals meals={favoriteMeals} />
    </>
  );
};

export default Favorites;
