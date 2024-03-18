import Link from "next/link";
import "./category.css";

const MealCategory = ({ categories }) => {
  const activePath = categories[1];
  return (
    <div className="list-group">
      <Link
        href="/meals/breakfast"
        className={`list-group-item list-group-item-action ${
          activePath === "breakfast" ? "activeMeal" : ""
        }`}
      >
        Breakfast
      </Link>
      <Link
        href="/meals/main-dishes"
        className={`list-group-item list-group-item-action ${
          activePath === "main-dishes" ? "activeMeal" : ""
        }`}
      >
        Main dish
      </Link>
      <Link
        href="/meals/salads"
        className={`list-group-item list-group-item-action ${
          activePath === "salads" ? "activeMeal" : ""
        }`}
      >
        Salads
      </Link>
      <Link
        href="/meals/desserts"
        className={`list-group-item list-group-item-action ${
          activePath === "desserts" ? "activeMeal" : ""
        }`}
      >
        Desserts
      </Link>
      <Link
        href="/meals/side-dishes"
        className={`list-group-item list-group-item-action ${
          activePath === "side-dishes" ? "activeMeal" : ""
        }`}
      >
        Side dish
      </Link>
    </div>
  );
};

export default MealCategory;
