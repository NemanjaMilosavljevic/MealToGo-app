import sql from "better-sqlite3";

const db = sql("meals.db");

export const getMeals = () => {
  return db.prepare(`SELECT * FROM meals`).all(); // all se koristi kada fetch data, ako bi fetch jedan row koristili bismo get()
};
