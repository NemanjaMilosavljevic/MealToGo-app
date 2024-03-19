"use client";

import { useState } from "react";
import { updateMealQuantityInCard } from "@/lib/actions";
import "./quantityPicker.css";

const QuantityPicker = ({ mealQuantity, id }) => {
  const [quantity, setQuantity] = useState(mealQuantity);

  const incrementQuantity = (q, id) => {
    setQuantity((prevState) => {
      return prevState + 1;
    });
    updateMealQuantityInCard(q, id);
  };

  const decrementQuantity = (q, id) => {
    setQuantity((prevState) => {
      if (prevState === 1) {
        return 1;
      }
      return prevState - 1;
    });
    updateMealQuantityInCard(q, id);
  };
  return (
    <div className="d-flex quantity-wrapper">
      <button
        className="btn text-white action-button"
        onClick={decrementQuantity.bind(null, quantity - 1, id)}
      >
        -
      </button>
      <button className="btn rounded-3 text-white quantity-button">
        {quantity}
      </button>
      <button
        className="btn text-white action-button"
        onClick={incrementQuantity.bind(null, quantity + 1, id)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityPicker;
