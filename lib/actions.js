"use server";

import {
  setFavoriteMeal,
  updateQuantity,
  addMealToCart,
  clearOrders,
  updateQuantityInCard,
  deleteMealFromCard,
} from "@/lib/meals";
import { revalidatePath } from "next/cache";

// actions related to meals
export const setFavMeal = async (isFavorite, id) => {
  await Promise.resolve(setFavoriteMeal(isFavorite, id));
  revalidatePath("/meals", "layout");
};

export const updateMealQuantity = async (quantity, id) => {
  await Promise.resolve(updateQuantity(quantity, id));
};

// actions related to card handling

export const saveMealInCart = async (id) => {
  await Promise.resolve(addMealToCart(id));
  revalidatePath("/order");
};

export const clearOrdersFromCard = async () => {
  await Promise.resolve(clearOrders());
  revalidatePath("/order");
};

export const updateMealQuantityInCard = async (quantity, id) => {
  await Promise.resolve(updateQuantityInCard(quantity, id));
  revalidatePath("/order", "layout");
};

export const deleteMeal = async (id) => {
  await Promise.resolve(deleteMealFromCard(id));
  revalidatePath("/order", "layout");
};
