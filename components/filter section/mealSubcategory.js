import Link from "next/link";
import "./category.css";

const MealSubcategory = ({ categories }) => {
  const activePath = categories[2];
  return (
    <div className="list-group">
      <Link
        href="/meals/main-dishes/barbeque"
        className={`list-group-item list-group-item-action ${
          activePath === "barbeque" ? "activeMeal" : ""
        }`}
      >
        Barbeque
      </Link>
      <Link
        href="/meals/main-dishes/pasta"
        className={`list-group-item list-group-item-action ${
          activePath === "pasta" ? "activeMeal" : ""
        }`}
      >
        Pasta
      </Link>
      <Link
        href="/meals/main-dishes/pizza"
        className={`list-group-item list-group-item-action ${
          activePath === "pizza" ? "activeMeal" : ""
        }`}
      >
        Pizza
      </Link>
    </div>
  );
};

export default MealSubcategory;
