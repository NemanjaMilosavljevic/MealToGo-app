import { getOrders, getTotalPrice } from "@/lib/db";
import OrderButtons from "@/components/orders/orderButtons";
import OrderCart from "@/components/orders/orderCart";
import "../globals.css";

const Order = () => {
  const orderedMeals = getOrders();

  return (
    <div className="container d-flex flex-column text-white orders-container">
      <OrderCart orderedMeals={orderedMeals} />
      <div className="d-flex gap-5 fs-5 align-items-center justify-content-end me-5 mt-5">
        <p>TOTAL PRICE:</p>
        <p className="fs-3">
          &#8364;{orderedMeals.length === 0 ? 0 : getTotalPrice().price}
        </p>
      </div>
      <OrderButtons orderedMeals={orderedMeals} />
    </div>
  );
};

export default Order;
