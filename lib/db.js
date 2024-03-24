import sql from "better-sqlite3";

const db = sql("meals.db");
const fs = require("fs");

export const saveMeal = async (meal) => {
  const filename = meal.image.name;
  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferImage), (err) => {
    if (err) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${filename}`;

  // save in DB

  db.prepare(
    `
  INSERT INTO meals VALUES (
    null,
    @title,
    @image,
    @description,
    @price,
    @category,
    @subcategory,
    @vegan,
    @fasting,
    @favorite,
    @quantity,
    @onsale
  )`
  ).run(meal);
};

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
        .prepare(
          "SELECT * FROM meals WHERE fasting = 1 AND (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END)"
        )
        .all(maxPrice, maxPrice);
    } else if (vegge && !fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE vegan = 1 AND (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END)"
        )
        .all(maxPrice, maxPrice);
    } else if (vegge && fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE (vegan = 1 OR fasting = 1) AND (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END)"
        )
        .all(maxPrice, maxPrice);
    } else {
      return db
        .prepare(
          "SELECT * FROM meals WHERE (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END)"
        )
        .all(maxPrice, maxPrice);
    }
  } else if (arg[1] === "category") {
    if (!vegge && fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE fasting = 1 AND (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END) AND category = ?"
        )
        .all(maxPrice, maxPrice, arg[0]);
    } else if (vegge && !fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE vegan = 1 AND (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END) AND category = ?"
        )
        .all(maxPrice, maxPrice, arg[0]);
    } else if (vegge && fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE (vegan = 1 OR fasting = 1) AND (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END) AND category = ?"
        )
        .all(maxPrice, maxPrice, arg[0]);
    } else {
      return db
        .prepare(
          "SELECT * FROM meals WHERE (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END) AND category = ?"
        )
        .all(maxPrice, maxPrice, arg[0]);
    }
  } else {
    if (!vegge && fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE fasting = 1 AND (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END) AND subcategory = ?"
        )
        .all(maxPrice, maxPrice, arg[0]);
    } else if (vegge && !fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE vegan = 1 AND (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END) AND subcategory = ?"
        )
        .all(maxPrice, maxPrice, arg[0]);
    } else if (vegge && fasting) {
      return db
        .prepare(
          "SELECT * FROM meals WHERE (vegan = 1 OR fasting = 1) AND (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END) AND subcategory = ?"
        )
        .all(maxPrice, maxPrice, arg[0]);
    } else {
      return db
        .prepare(
          "SELECT * FROM meals WHERE (CASE WHEN (onsale = 0) THEN (price <= ?) ELSE (0.75 * price <= ?) END) AND subcategory = ?"
        )
        .all(maxPrice, maxPrice, arg[0]);
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
  return db
    .prepare(
      "SELECT MIN (CASE WHEN (onsale = 1) THEN (0.75 * price) ELSE price END) as price FROM meals "
    )
    .get();
};

export const getMaxPrice = () => {
  return db.prepare("SELECT MAX (price) as price FROM meals").get();
};

export const updateQuantity = (quantity, id) => {
  return db
    .prepare("UPDATE meals SET quantity = ? WHERE id = ?")
    .run(quantity, id);
};

// search meals
export const searchMeals = (str) => {
  return db.prepare(`SELECT * FROM meals WHERE title LIKE ?`).all(str);
};

export const getOnsaleMeals = (onsale) => {
  return db.prepare("SELECT * FROM meals WHERE onsale = ?").all(onsale);
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
  return db
    .prepare(
      "SELECT SUM (CASE WHEN (onsale = 1) THEN (0.75 * price * quantity) ELSE (price * quantity)  END) as price FROM card "
    )
    .get();
};

export const updateQuantityInCard = (quantity, id) => {
  return db
    .prepare("UPDATE card SET quantity = ? WHERE id = ?")
    .run(quantity, id);
};

export const deleteMealCard = (id) => {
  return db.prepare(`DELETE FROM card WHERE id = ?`).run(id);
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

export const clearUser = (id) => {
  return db.prepare(`DELETE FROM users WHERE id= ?`).run(id);
};

export const promoteToAdmin = (role, id) => {
  return db.prepare(`UPDATE users SET role = ? WHERE id = ?`).run(role, id);
};

// admin functions

export const updateOnsale = (isOnsale, id) => {
  return db
    .prepare("UPDATE meals SET onsale = ? WHERE id = ?")
    .run(isOnsale, id);
};

export const deleteMealDB = (id) => {
  return db.prepare(`DELETE FROM meals WHERE id = ?`).run(id);
};

export const editMealDB = async (id, editedMeal) => {
  if (!(editedMeal.image.name === "undefined")) {
    const filename = editedMeal.image.name;
    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferImage = await editedMeal.image.arrayBuffer();

    stream.write(Buffer.from(bufferImage), (err) => {
      if (err) {
        throw new Error("Editing image failed!");
      }
    });

    editedMeal.image = `/images/${filename}`;

    return db
      .prepare(
        `UPDATE meals SET 
      title = ?,
      image = ?,
      description = ?,
      price = ?,
      category = ?,
      subcategory = ?,
      vegan = ?,
      fasting = ?
      WHERE id = ?`
      )
      .run(
        editedMeal.title,
        editedMeal.image,
        editedMeal.description,
        editedMeal.price,
        editedMeal.category,
        editedMeal.subcategory,
        editedMeal.vegan,
        editedMeal.fasting,
        id
      );
  } else {
    return db
      .prepare(
        `UPDATE meals SET 
          title = ?,
          description = ?,
          price = ?,
          category = ?,
          subcategory = ?,
          vegan = ?,
          fasting = ?
        WHERE id = ?`
      )
      .run(
        editedMeal.title,
        editedMeal.description,
        editedMeal.price,
        editedMeal.category,
        editedMeal.subcategory,
        editedMeal.vegan,
        editedMeal.fasting,
        id
      );
  }
};
