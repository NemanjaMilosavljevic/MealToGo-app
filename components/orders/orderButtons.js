"use client";

import { clearOrdersFromCard } from "@/lib/actions";

const OrderButtons = ({ orderedMeals }) => {
  const clearOrderHandler = () => {
    clearOrdersFromCard();
  };
  const paymentHandler = () => {
    if (orderedMeals.length === 0) {
      alert(
        "Nema itema u korpi!! Prvo morate dodati neki item da biste mogli platiti"
      );
      return;
    }
    alert("USPESNO OBAVLJENA KUPOVINA");
    clearOrdersFromCard();
  };
  return (
    <div>
      <button
        className="btn btn-danger btn-lg me-5"
        onClick={clearOrderHandler}
      >
        CLEAR ORDERS
      </button>
      <button className="btn btn-success btn-lg mx-5" onClick={paymentHandler}>
        PAY ORDER
      </button>
    </div>
  );
};

export default OrderButtons;
