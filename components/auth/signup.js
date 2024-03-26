"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { createUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ErrorModal from "../modal/ErrorModal";
import "./signup.css";

const Signup = ({ status }) => {
  const [isLogin, setIsLogin] = useState(status === "register" ? false : true);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const formIsValid = isEmailValid && isPasswordValid;

  const [error, setError] = useState("");

  const resetError = () => {
    setError("");
  };

  const router = useRouter();

  const changeModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    if (isLogin) {
      router.push("/register");
    } else {
      router.push("/login");
    }
  };

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
    setIsEmailValid(
      e.target.value &&
        e.target.value.includes("@") &&
        e.target.value.includes(".")
        ? true
        : false
    );
  };

  const passwordHandler = (e) => {
    setEnteredPassword(e.target.value);
    setIsPasswordValid(e.target.value.length < 7 ? false : true);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    //client side validation
    if (!formIsValid) {
      return;
    }

    if (isLogin) {
      // log registered user
      const result = await signIn("credentials", {
        callbackUrl: "/",
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
        role: "viewer",
      });

      if (!result.error) {
        router.replace(result.url);
      } else {
        setError(result.error);
      }
    } else {
      //create new user
      try {
        await createUser(enteredEmail, enteredPassword, "viewer");
        confirm(
          "You successfully register! Please login now to start ordering delicious meals!"
        );
        router.push("/");
      } catch (err) {
        setError(err.message);
      }
    }

    setEnteredEmail("");
    setEnteredPassword("");
  };

  return (
    <form className="container text-white form-login" onSubmit={loginHandler}>
      {error && <ErrorModal error={error} resetError={resetError} />}
      <h1 className="mb-3">{isLogin ? "Login" : "Sign up"}</h1>
      {!isLogin && <h5 className="mb-5">Register new account</h5>}

      {!isEmailValid && (
        <p className="text-danger m-0 error-text">Email is not valid!</p>
      )}
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
            required
            disabled={error}
          />
        </div>
      </div>

      {!isPasswordValid && (
        <p className="text-danger m-0 error-text">
          Password require min 7 characters!
        </p>
      )}
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
            required
            min={7}
            disabled={error}
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
