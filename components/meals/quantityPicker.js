"use client";

import { useState } from "react";
import { updateMealQuantity, saveMealInCart } from "@/lib/actions";
import { noSession } from "@/lib/actions";
import "./Meals.css";

const QuantityPicker = ({ mealQuantity, id, togglePopupInfo }) => {
  const [quantity, setQuantity] = useState(mealQuantity);

  const addMealToCart = async (id) => {
    if (await noSession()) {
      togglePopupInfo(id);
      return;
    }

    //push meal in cart
    saveMealInCart(id);

    //reset quantity state
    setQuantity(1);

    //reset quantity in DB
    updateMealQuantity(1, id);
  };

  const incrementQuantity = async (q, id) => {
    if (await noSession()) {
      togglePopupInfo(id);
      return;
    }

    setQuantity((prevState) => {
      return prevState + 1;
    });
    updateMealQuantity(q, id);
  };

  const decrementQuantity = async (q, id) => {
    if (await noSession()) {
      togglePopupInfo(id);
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
          className="btn text-white quantityBtn"
          onClick={decrementQuantity.bind(
            null,
            quantity === 1 ? 1 : quantity - 1,
            id
          )}
        >
          -
        </button>
        <div className="btn rounded-4 text-white quantity-preview-button px-3">
          {quantity}
        </div>
        <button
          type="button"
          className="btn text-white quantityBtn"
          onClick={incrementQuantity.bind(null, quantity + 1, id)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="btn btn-sm btnGreen"
        onClick={addMealToCart.bind(null, id)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default QuantityPicker;
