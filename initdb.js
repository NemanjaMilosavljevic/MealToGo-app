const sql = require("better-sqlite3");
const db = sql("meals.db");

const dummyMeals = [
  {
    title: "Cevap das asdas adas asdas  das",
    image: "/images/anh-nguyen-kcA-c3f_3FE-unsplash.jpg",
    description:
      "opis neki  asdsa dasdasas das daasasd asas adasd asd as daas dddddddddddddddddddddddd asd sa das as das ada a",
    price: 100,
    category: "main dish",
    subcategory: "pizza",
    vegan: 0,
    fasting: 0,
  },
  {
    title: "Pomfrit",
    image: "/images/anh-nguyen-kcA-c3f_3FE-unsplash.jpg",
    description: "Pomfrit ",
    price: 50,
    category: "prilog",
    subcategory: "",
    vegan: 1,
    fasting: 1,
  },
];

db.prepare(
  `CREATE TABLE IF NOT EXISTS meals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  vegan INTEGER,
  fasting INTEGER
)`
).run();

async function initData() {
  const stmt = db.prepare(`
    INSERT INTO meals VALUES (
      null,
      @title,
      @image,
      @description,
      @price,
      @category,
      @subcategory,
      @vegan,
      @fasting
    )
    `);

  for (const meal of dummyMeals) {
    stmt.run(meal);
  }
}

initData();
