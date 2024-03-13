import sql from "better-sqlite3";

const db = sql("meals.db");

export const getMeals = () => {
  return db.prepare(`SELECT * FROM meals`).all(); // all se koristi kada fetch data, ako bi fetch jedan row koristili bismo get()
};

export const getMeal = (id) => {
  return db.prepare(`SELECT * FROM meals WHERE id = ?`).get(id);
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

export const updateQuantity = (quantity, id) => {
  return db
    .prepare("UPDATE meals SET quantity = ? WHERE id = ?")
    .run(quantity, id);
};

//Cart

export const addMealToCart = (mealId) => {
  return db
    .prepare(`INSERT INTO card SELECT * FROM meals WHERE id = ?`)
    .run(mealId);
};

export const getOrders = () => {
  return db.prepare(`SELECT * FROM card`).all();
};

export const clearOrders = () => {
  return db.prepare(`DELETE FROM card`).run();
};

export const getTotalPrice = () => {
  return db.prepare("SELECT SUM (price * quantity) as price FROM card ").get();
};

export const updateQuantityInCard = (quantity, id) => {
  return db
    .prepare("UPDATE card SET quantity = ? WHERE id = ?")
    .run(quantity, id);
};

export const deleteMealFromCard = (id) => {
  return db.prepare(`DELETE FROM card WHERE id = ?`).run(id);
};

// search meals
export const searchMeals = (str) => {
  return db.prepare(`SELECT * FROM meals WHERE title LIKE ?`).all(str);
};

// users

export const getUsers = () => {
  return db.prepare(`SELECT * FROM users`).all();
};

export const getUser = (email) => {
  return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
};

export const clearUsers = () => {
  return db.prepare(`DELETE FROM users`).run();
};
