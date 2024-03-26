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
  deleteMealCard,
  searchMeals,
  getUser,
  saveMeal,
  updateOnsale,
  deleteMealDB,
  editMealDB,
  clearUser,
  promoteToAdmin,
} from "@/lib/db";
import { revalidatePath } from "next/cache";

// actions related to meals
export const setFavMeal = async (isFavorite, id) => {
  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    await Promise.resolve(setFavoriteMeal(isFavorite, id));
    revalidatePath("/meals", "layout");
  }
};

export const updateMealQuantity = async (quantity, id) => {
  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    await Promise.resolve(updateQuantity(quantity, id));
  }
};

// actions related to card handling

export const saveMealInCart = async (id) => {
  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    try {
      await Promise.resolve(addMealToCart(id));
    } catch (err) {
      return { message: "You already have this meal in the card!" };
    }
    revalidatePath("/order");
  }
};

export const clearOrdersFromCard = async () => {
  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    await Promise.resolve(clearOrders());
    revalidatePath("/order");
  }
};

export const updateMealQuantityInCard = async (quantity, id) => {
  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    await Promise.resolve(updateQuantityInCard(quantity, id));
    revalidatePath("/order", "layout");
  }
};

export const deleteMealFromCard = async (id) => {
  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    await Promise.resolve(deleteMealCard(id));
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

// Admin actions

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
      errorMessage: `No empty fields are allowed! Please fill input fields that are empty!`,
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
    onsale: 0,
  };

  await saveMeal(newMeal);

  revalidatePath("/meals");
  redirect("/meals");
};

export const updateMealToBeOnsale = async (isOnsale, id) => {
  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    await Promise.resolve(updateOnsale(isOnsale, id));
    revalidatePath("/admin", "layout");
  }
};

export const deleteMealFromDB = async (id) => {
  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    await Promise.resolve(deleteMealDB(id));
    revalidatePath("/admin", "layout");
  }
};

export const editMeal = async (id, formData) => {
  const title = formData.get("title");
  const price = formData.get("price");
  const description = formData.get("description");
  const category = formData.get("category");
  const subcategory = formData.get("subcategory") ?? "";
  const vegan = formData.get("vegan") === "on" ? 1 : 0;
  const fasting = formData.get("fasting") === "on" ? 1 : 0;
  const image = formData.get("image");

  const editedMeal = {
    title: title,
    image: image,
    description: description,
    price: price,
    category: category,
    subcategory: subcategory,
    vegan: vegan,
    fasting: fasting,
  };

  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    await Promise.resolve(editMealDB(id, editedMeal));
    revalidatePath("/admin", "layout");
    redirect("/admin/dashboard/meals");
  }
};

export const deleteUserFromDB = async (id) => {
  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    await Promise.resolve(clearUser(id));
    revalidatePath("/admin", "layout");
  }
};

export const updateUserToAdmin = async (role, id) => {
  if (await noSession()) {
    throw new Error("You are not authorized to do this action!");
  } else {
    await Promise.resolve(promoteToAdmin(role, id));
    revalidatePath("/admin", "layout");
  }
};
