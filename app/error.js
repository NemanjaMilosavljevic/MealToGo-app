"use client";

import "./globals.css";

const Error = ({ error }) => {
  return (
    <div className="error-wrapper">
      <p className="error">{error.message}</p>
    </div>
  );
};

export default Error;
