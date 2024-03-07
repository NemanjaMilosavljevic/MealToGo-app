"use client";

import { deleteMeal } from "@/lib/actions";

const DeleteMealButton = ({ id }) => {
  const deleteMealFromCard = () => {
    deleteMeal(id);
  };

  return (
    <button className="btn btn-danger btn-lg" onClick={deleteMealFromCard}>
      Delete Meal
    </button>
  );
};

export default DeleteMealButton;
