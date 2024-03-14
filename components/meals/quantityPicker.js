"use client";

import { useState } from "react";
import { updateMealQuantity, saveMealInCart } from "@/lib/actions";
import { noSession } from "@/lib/actions";

const QuantityPicker = ({ mealQuantity, id }) => {
  const [quantity, setQuantity] = useState(mealQuantity);

  const addMealToCart = (id) => {
    if (noSession()) {
      alert(
        "This action is not authorize for user which is not login!! Please login first!"
      );
      return;
    }

    //push meal in cart
    saveMealInCart(id);

    //reset quantity state
    setQuantity(1);

    //reset quantity in DB
    updateMealQuantity(1, id);
  };

  const incrementQuantity = (q, id) => {
    if (noSession()) {
      alert(
        "This action is not authorize for user which is not login!! Please login first!"
      );
      return;
    }

    setQuantity((prevState) => {
      return prevState + 1;
    });
    updateMealQuantity(q, id);
  };

  const decrementQuantity = (q, id) => {
    if (noSession()) {
      alert(
        "This action is not authorize for user which is not login!! Please login first!"
      );
      return;
    }

    setQuantity((prevState) => {
      if (prevState === 1) {
        return 1;
      }
      return prevState - 1;
    });
    updateMealQuantity(q, id);
  };

  return (
    <div className="d-flex justify-content-between mb-3">
      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-outline-success text-white"
          onClick={decrementQuantity.bind(
            null,
            quantity === 1 ? 1 : quantity - 1,
            id
          )}
        >
          -
        </button>
        <div className="btn btn-outline-success rounded-3 text-white">
          {quantity}
        </div>
        <button
          type="button"
          className="btn btn-outline-success text-white"
          onClick={incrementQuantity.bind(null, quantity + 1, id)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="btn btn-success btn-sm"
        onClick={addMealToCart.bind(null, id)}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default QuantityPicker;
