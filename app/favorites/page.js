import Meals from "@/components/meals/Meals";
import { getFavoriteMeals } from "@/lib/db";

const Favorites = () => {
  const favoriteMeals = getFavoriteMeals(1);

  return <Meals meals={favoriteMeals} />;
};

export default Favorites;
