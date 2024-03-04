"use server";

import { setFavoriteMeal } from "@/lib/meals";
import { revalidatePath } from "next/cache";

export const setFavMeal = async (isFavorite, id) => {
  await Promise.resolve(setFavoriteMeal(isFavorite, id));
  revalidatePath("/meals", "layout");
};
