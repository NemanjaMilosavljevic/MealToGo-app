"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import {
  setFavoriteMeal,
  updateQuantity,
  addMealToCart,
  clearOrders,
  updateQuantityInCard,
  deleteMealFromCard,
  searchMeals,
  getUser,
  saveMeal,
  updateOnsale,
} from "@/lib/db";
import { revalidatePath } from "next/cache";

// actions related to meals
export const setFavMeal = async (isFavorite, id) => {
  if (await noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(setFavoriteMeal(isFavorite, id));
    revalidatePath("/meals", "layout");
  }
};

export const updateMealQuantity = async (quantity, id) => {
  if (await noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(updateQuantity(quantity, id));
  }
};

// actions related to card handling

export const saveMealInCart = async (id) => {
  if (await noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(addMealToCart(id));
    revalidatePath("/order");
  }
};

export const clearOrdersFromCard = async () => {
  if (await noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(clearOrders());
    revalidatePath("/order");
  }
};

export const updateMealQuantityInCard = async (quantity, id) => {
  if (await noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(updateQuantityInCard(quantity, id));
    revalidatePath("/order", "layout");
  }
};

export const deleteMeal = async (id) => {
  if (await noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(deleteMealFromCard(id));
    revalidatePath("/order", "layout");
  }
};

// search functions

export const searchMealsPerTitle = async (searchString) => {
  return searchMeals(searchString);
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

// Admin - create meal

export const createMeal = async (prevState, formData) => {
  const title = formData.get("title");
  const price = formData.get("price");
  const description = formData.get("description");
  const category = formData.get("category");
  const subcategory = formData.get("subcategory") ?? "";
  const vegan = formData.get("vegan") === "on" ? 1 : 0;
  const fasting = formData.get("fasting") === "on" ? 1 : 0;
  const image = formData.get("image");

  // server side validation

  if (!title || !price || !description || !category || !image) {
    return {
      errorMessage: "No empty fields are allowed!",
    };
  }

  const newMeal = {
    title: title,
    image: image,
    description: description,
    price: price,
    category: category,
    subcategory: subcategory,
    vegan: vegan,
    fasting: fasting,
    favorite: 0,
    quantity: 1,
  };

  await saveMeal(newMeal);

  revalidatePath("/meals");
  redirect("/meals");
};

export const updateMealToBeOnsale = async (isOnsale) => {
  if (await noSession()) {
    throw new Error("You are not authorizes to do this action!");
  } else {
    await Promise.resolve(updateOnsale(isOnsale));
  }
};
