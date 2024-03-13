import { hashPassword } from "@/lib/auth";
import { getUser } from "@/lib/meals";

const sql = require("better-sqlite3");
const db = sql("meals.db");

export async function POST(req, res) {
  //data validation
  const data = await req.json();
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return Response.json({ message: "Invalid input" }, { status: 422 });
  }

  // check if user exist in db
  const existingUser = getUser(email);

  if (existingUser) {
    return Response.json({ message: "User exists already!" }, { status: 422 });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = { email: email, password: hashedPassword };

  //create new user and store it in db
  db.prepare(
    `INSERT INTO users VALUES (null,
        @email,
        @password)`
  ).run(newUser);

  return Response.json({ message: "User created" }, { status: 200 });
}
