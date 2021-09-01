import React from "react";

const ErrorHandler = ({ error }) => {
  return (
    <>
      <span className="error">{error}</span>
    </>
  );
};

export default ErrorHandler;
