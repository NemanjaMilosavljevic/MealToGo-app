import Link from "next/link";

const MealSubcategory = () => {
  return (
    <div className="list-group w-100">
      <Link
        href="/meals/main-dishes/barbeque"
        className="list-group-item list-group-item-action "
      >
        Barbeque
      </Link>
      <Link
        href="/meals/main-dishes/pasta"
        className="list-group-item list-group-item-action"
      >
        Pasta
      </Link>
      <Link
        href="/meals/main-dishes/pizza"
        className="list-group-item list-group-item-action"
      >
        Pizza
      </Link>
    </div>
  );
};

export default MealSubcategory;
