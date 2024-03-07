"use client";

import { useState } from "react";
import { updateMealQuantityInCard } from "@/lib/actions";

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
    <div className="d-flex gap-3">
      <button
        type="button"
        className="btn btn-outline-success text-white btn-lg"
        onClick={decrementQuantity.bind(null, quantity - 1, id)}
      >
        -
      </button>
      <button
        type="button"
        className="btn btn-outline-success rounded-3 text-white btn-lg"
      >
        {quantity}
      </button>
      <button
        type="button"
        className="btn btn-outline-success text-white btn-lg"
        onClick={incrementQuantity.bind(null, quantity + 1, id)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityPicker;
