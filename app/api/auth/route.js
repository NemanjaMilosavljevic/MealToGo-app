import { hashPassword } from "@/lib/auth";
import { getUser } from "@/lib/db";

const sql = require("better-sqlite3");
const db = sql("meals.db");

//log as admin: {email: admin@admin.com, pasword: adminadmin}

export async function POST(req, res) {
  //data validation
  const data = await req.json();
  const { email, password, role } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return Response.json(
      { message: "Please enter valid input!" },
      { status: 422 }
    );
  }

  // check if user exist in db
  const existingUser = getUser(email);

  if (existingUser) {
    return Response.json({ message: "User already exists!" }, { status: 422 });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = {
    email: email,
    password: hashedPassword,
    role: role,
  };

  //create new user and store it in db
  db.prepare(
    `INSERT INTO users VALUES (null,
        @email,
        @password,
        @role)`
  ).run(newUser);

  return Response.json(
    { message: "You successfully created account! Please login to continue!" },
    { status: 200 }
  );
}
