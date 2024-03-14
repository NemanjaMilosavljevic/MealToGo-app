"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import {
  setFavoriteMeal,
  updateQuantity,
  addMealToCart,
  clearOrders,
  updateQuantityInCard,
  deleteMealFromCard,
  searchMeals,
  getUser,
} from "@/lib/db";
import { revalidatePath } from "next/cache";

// actions related to meals
export const setFavMeal = async (isFavorite, id) => {
  if (noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(setFavoriteMeal(isFavorite, id));
    revalidatePath("/meals", "layout");
  }
};

export const updateMealQuantity = async (quantity, id) => {
  if (noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(updateQuantity(quantity, id));
  }
};

// actions related to card handling

export const saveMealInCart = async (id) => {
  if (noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(addMealToCart(id));
    revalidatePath("/order");
  }
};

export const clearOrdersFromCard = async () => {
  if (noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(clearOrders());
    revalidatePath("/order");
  }
};

export const updateMealQuantityInCard = async (quantity, id) => {
  if (noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(updateQuantityInCard(quantity, id));
    revalidatePath("/order", "layout");
  }
};

export const deleteMeal = async (id) => {
  if (noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(deleteMealFromCard(id));
    revalidatePath("/order", "layout");
  }
};

// search functions

export const searchMealsPerTitle = async (searchString) => {
  if (noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    return searchMeals(searchString);
  }
};

// Auth

export const noSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return true;
  }

  return false;
};

export const getRole = async (userEmail) => {
  const role = await getUser(userEmail)?.role;
  return role;
};
