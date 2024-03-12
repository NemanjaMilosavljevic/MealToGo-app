"use client";

import { useState } from "react";

const createUser = async (e, p) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email: e, password: p }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  console.log("data", data);
  return data;
};

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // log user in
    } else {
      //create new user
      try {
        const response = await createUser(enteredEmail, enteredPassword);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form
      className="container m-auto mt-5 bg-danger p-5"
      onSubmit={loginHandler}
    >
      <div className="row mb-3">
        <label htmlFor="email" className="col-2 col-form-label">
          Email
        </label>
        <div className="col-4">
          <input
            type="email"
            className="form-control"
            id="email"
            value={enteredEmail}
            onChange={emailHandler}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="password" className="col-2 col-form-label">
          Password
        </label>
        <div className="col-4">
          <input
            type="password"
            className="form-control"
            id="password"
            value={enteredPassword}
            onChange={passwordHandler}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-success">
        Sign in
      </button>
    </form>
  );
};

export default Signup;
