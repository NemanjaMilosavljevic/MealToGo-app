"use client";

import "./globals.css";

const Error = ({ error, reset }) => {
  return (
    <div className="error-wrapper">
      <p className="error">ERROR OCCURED!</p>
      <p className="error">{error.message}</p>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
};
export default Error;
