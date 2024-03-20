import "./cart.css";

import { useRouter } from "next/navigation";
import QuantityPicker from "../orders/quantityPicker";
import DeleteMealButton from "../orders/deleteMealButton";

const Cart = ({ toggleCart, orderedMeals, totalPrice }) => {
  const router = useRouter();

  const goToOrderHandler = () => {
    router.push("/order");
    toggleCart();
  };

  return (
    <div className="orderCart d-flex flex-column justify-content-between text-white">
      <h6 className="text-center mt-2">Your order:</h6>
      <hr />
      <ul className="list-unstyled m-0">
        {orderedMeals.map((meal) => {
          return (
            <div key={meal.id}>
              <li className="d-flex gap-4 justify-content-between align-items-center mb-2">
                <div className="d-flex flex-column gap-2">
                  <h6 className="m-0 fw-light meal-title-card">{meal.title}</h6>
                  <QuantityPicker mealQuantity={meal.quantity} id={meal.id} />
                </div>
                <div className="d-flex flex-column align-items-end gap-1">
                  <DeleteMealButton id={meal.id} />
                  <div className="fs-5">
                    &#8364;{meal.price * meal.quantity}
                  </div>
                </div>
              </li>
              <hr />
            </div>
          );
        })}
      </ul>
      <div className="d-flex align-items-center gap-5 justify-content-end my-3">
        <h6>TOTAL PRICE:</h6>
        <h5>&#8364;{orderedMeals.length === 0 ? 0 : totalPrice}</h5>
      </div>

      <div className="d-flex justify-content-end my-3">
        <button className="btn btn-sm order-button" onClick={goToOrderHandler}>
          Go to order
        </button>
      </div>
    </div>
  );
};

export default Cart;
