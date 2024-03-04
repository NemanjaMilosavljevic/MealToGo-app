import sql from "better-sqlite3";

const db = sql("meals.db");

export const getMeals = () => {
  return db.prepare(`SELECT * FROM meals`).all(); // all se koristi kada fetch data, ako bi fetch jedan row koristili bismo get()
};

export const filterMealsByCategory = (categorySlug) => {
  return db.prepare("SELECT * FROM meals WHERE category = ?").all(categorySlug);
};

export const filterMealsBySubcategory = (subcategorySlug) => {
  return db
    .prepare("SELECT * FROM meals WHERE subcategory = ?")
    .all(subcategorySlug);
};

export const getFavoriteMeals = (favorite) => {
  return db.prepare("SELECT * FROM meals WHERE favorite = ?").all(favorite);
};

export const setFavoriteMeal = (isFavorite, id) => {
  console.log("uspeh");
  return db
    .prepare("UPDATE meals SET favorite = ? WHERE id = ?")
    .run(isFavorite, id);
};
