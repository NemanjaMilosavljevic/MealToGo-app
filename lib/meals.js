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

export const filterMealsByQueryParams = (vegge, fasting, maxPrice, ...arg) => {
  if (arg.length === 0) {
    if (!vegge && fasting) {
      return db
        .prepare("SELECT * FROM meals WHERE fasting = 1 AND (price <= ?)")
        .all(maxPrice);
    } else if (vegge && !fasting) {
      return db
        .prepare("SELECT * FROM meals WHERE vegan = 1 AND (price <= ?)")
        .all(maxPrice);
    } else if (vegge && fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE (vegan = 1 OR fasting = 1) AND (price <= ?)"
        )
        .all(maxPrice);
    } else {
      return db.prepare("SELECT * FROM meals WHERE (price <= ?)").all(maxPrice);
    }
  } else if (arg[1] === "category") {
    if (!vegge && fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE fasting = 1 AND (price <= ?) AND category = ?"
        )
        .all(maxPrice, arg[0]);
    } else if (vegge && !fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE vegan = 1 AND (price <= ?) AND category = ?"
        )
        .all(maxPrice, arg[0]);
    } else if (vegge && fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE (vegan = 1 OR fasting = 1) AND (price <= ?) AND category = ?"
        )
        .all(maxPrice, arg[0]);
    } else {
      return db
        .prepare("SELECT * FROM meals WHERE (price <= ?) AND category = ?")
        .all(maxPrice, arg[0]);
    }
  } else {
    if (!vegge && fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE fasting = 1 AND (price <= ?) AND subcategory = ?"
        )
        .all(maxPrice, arg[0]);
    } else if (vegge && !fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE vegan = 1 AND (price <= ?) AND subcategory = ?"
        )
        .all(maxPrice, arg[0]);
    } else if (vegge && fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE (vegan = 1 OR fasting = 1) AND (price <= ?) AND subcategory = ?"
        )
        .all(maxPrice, arg[0]);
    } else {
      return db
        .prepare("SELECT * FROM meals WHERE (price <= ?) AND subcategory = ?")
        .all(maxPrice, arg[0]);
    }
  }
};

export const getFavoriteMeals = (favorite) => {
  return db.prepare("SELECT * FROM meals WHERE favorite = ?").all(favorite);
};

export const setFavoriteMeal = (isFavorite, id) => {
  return db
    .prepare("UPDATE meals SET favorite = ? WHERE id = ?")
    .run(isFavorite, id);
};

export const getMinPrice = () => {
  return db.prepare("SELECT MIN (price) as price FROM meals ").get();
};

export const getMaxPrice = () => {
  return db.prepare("SELECT MAX (price) as price FROM meals").get();
};
