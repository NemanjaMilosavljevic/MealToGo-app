import { getOrders, getTotalPrice } from "@/lib/db";
import OrderButtons from "@/components/orders/orderButtons";
import QuantityPicker from "@/components/orders/quantityPicker";
import DeleteMealButton from "@/components/orders/deleteMealButton";

const Order = () => {
  const orderedMeals = getOrders();

  return (
    <div className="container d-flex flex-column align-items-start gap-5">
      <ul className="w-100 list-unstyled">
        {orderedMeals.map((meal) => {
          return (
            <li key={meal.id}>
              <div className="d-flex flex-row gap-4 justify-content-between align-items-center border border-success border-3 my-2 p-5 text-white">
                <h5>{meal.title}</h5>
                <QuantityPicker mealQuantity={meal.quantity} id={meal.id} />
                <div className="fs-4">&#8364;{meal.price * meal.quantity}</div>
                <div>
                  <DeleteMealButton id={meal.id} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="d-flex flex-row gap-3 text-white fs-2">
        <p>Total price:</p>
        &#8364;{orderedMeals.length === 0 ? 0 : getTotalPrice().price}
      </div>

      <OrderButtons orderedMeals={orderedMeals} />
    </div>
  );
};

export default Order;
