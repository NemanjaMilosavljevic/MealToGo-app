import "./cart.css";

import { useRouter } from "next/navigation";
import { clearOrdersFromCard } from "@/lib/actions";
import QuantityPicker from "../orders/quantityPicker";
import DeleteMealButton from "../orders/deleteMealButton";

const Cart = ({ toggleCart, orderedMeals, totalPrice }) => {
  const router = useRouter();

  const redirectToCard = () => {
    router.push("/order");
    toggleCart();
  };

  const clearMealsFromCard = () => {
    clearOrdersFromCard();
    toggleCart();
  };

  return (
    <div className="bg-dark orderCart d-flex flex-column justify-content-between text-white">
      <h2>Your Order</h2>
      <hr />
      <ul className="list-unstyled m-0">
        {orderedMeals.map((meal) => {
          return (
            <li className="mb-3" key={meal.id}>
              <div className="d-flex gap-4 justify-content-between align-items-center">
                <h5 className="m-0">{meal.title}</h5>
                <QuantityPicker mealQuantity={meal.quantity} id={meal.id} />
                <div className="fs-4">&#8364;{meal.price * meal.quantity}</div>
                <DeleteMealButton id={meal.id} />
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
      <div className="d-flex align-items-center gap-4">
        <h5>Total price:</h5>
        <h5>&#8364;{orderedMeals.length === 0 ? 0 : totalPrice}</h5>
      </div>
      <hr />
      <div>
        <button
          className="btn btn-outline-danger btn-sm me-5"
          onClick={clearMealsFromCard}
        >
          Clear Cart
        </button>
        <button
          className="btn btn-outline-success btn-sm"
          onClick={redirectToCard}
        >
          Go To Card
        </button>
      </div>
    </div>
  );
};

export default Cart;
