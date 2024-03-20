"use client";

import { useRouter } from "next/navigation";
import { clearOrdersFromCard } from "@/lib/actions";
import "./orderButtons.css";

const OrderButtons = ({ orderedMeals }) => {
  const router = useRouter();
  const redirectToMeals = () => {
    router.replace("/meals");
  };

  const paymentHandler = () => {
    if (orderedMeals.length === 0) {
      alert(
        "There are no items in the cart! You must first add an item to be able to pay!"
      );
      return;
    }
    alert("You successfully completed purchase!");
    clearOrdersFromCard();
    router.push("/meals");
  };

  return (
    <div className="d-flex justify-content-end me-5 mb-5">
      <button
        className="btn border-white text-white me-3 addmeals-button"
        onClick={redirectToMeals}
      >
        Add more meals
      </button>
      <button
        className="btn text-white border-0 payment-button"
        onClick={paymentHandler}
      >
        Go to payment
      </button>
    </div>
  );
};

export default OrderButtons;
