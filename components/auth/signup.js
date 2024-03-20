"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { createUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import "./signup.css";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const router = useRouter();

  const changeModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    //client side validation

    if (isLogin) {
      // log user in
      const result = await signIn("credentials", {
        callbackUrl: "/",
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
        role: enteredEmail.includes("@admin") ? "admin" : "viewer",
      });

      if (!result.error) {
        router.replace(result.url);
      } else {
        throw new Error("greska");
      }
    } else {
      //create new user
      try {
        await createUser(
          enteredEmail,
          enteredPassword,
          enteredEmail.includes("@admin") ? "admin" : "viewer"
        );
      } catch (err) {
        console.log(err);
      }
    }

    setEnteredEmail("");
    setEnteredPassword("");
  };

  return (
    <form className="container text-white form-login" onSubmit={loginHandler}>
      <h1 className="mb-3">{isLogin ? "Login" : "Sign up"}</h1>
      {!isLogin && <h4 className="mb-5">Create new account</h4>}

      <div className="row mb-3">
        <label htmlFor="email" className="col-3 col-form-label">
          Email
        </label>
        <div className="col-9">
          <input
            type="email"
            className="form-control"
            id="email"
            value={enteredEmail}
            onChange={emailHandler}
            name="email"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="password" className="col-3 col-form-label">
          Password
        </label>
        <div className="col-9">
          <input
            type="password"
            className="form-control"
            id="password"
            value={enteredPassword}
            onChange={passwordHandler}
            name="password"
          />
        </div>
      </div>

      <button type="submit" className="btn mb-3">
        {isLogin ? "Login" : "Sign up"}
      </button>

      <p>
        {!isLogin ? "Already have account?" : "Create new account?"}
        <span onClick={changeModeHandler} className="ms-2">
          {!isLogin ? "Login" : "Sign up"}
        </span>
      </p>
    </form>
  );
};

export default Signup;
