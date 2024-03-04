import Link from "next/link";

const MealCategory = () => {
  return (
    <div className="list-group w-100">
      <Link
        href="/meals/breakfast"
        className="list-group-item list-group-item-action "
      >
        Breakfast
      </Link>
      <Link
        href="/meals/main-dishes"
        className="list-group-item list-group-item-action"
      >
        Main dish
      </Link>
      <Link
        href="/meals/salads"
        className="list-group-item list-group-item-action"
      >
        Salads
      </Link>
      <Link
        href="/meals/desserts"
        className="list-group-item list-group-item-action"
      >
        Desserts
      </Link>
      <Link
        href="/meals/side-dishes"
        className="list-group-item list-group-item-action "
      >
        Side dish
      </Link>
    </div>
  );
};

export default MealCategory;
