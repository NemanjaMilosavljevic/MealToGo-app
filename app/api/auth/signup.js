import { hashPassword } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  console.log("ahhahhaa");

  //data validation
  const data = req.body;
  const { email, password } = data;

  console.log(email, "email");
  console.log(password, "password");

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid input" });
  }
  const hashedPassword = await hashPassword(password);

  const newUser = { email: email, password: hashedPassword };

  //connect to db

  //create new user and store it in db
  const result = db
    .prepare(
      `INSERT INTO users VALUES (null,
        @email,
        @password)`
    )
    .run(newUser);

  console.log("result", result);

  res.status(201).json({ message: "User created" });
}
