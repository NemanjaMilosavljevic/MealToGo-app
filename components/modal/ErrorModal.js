"use client";

const ErrorModal = ({ error, resetError }) => {
  return (
    <div className="container-fluid error-modal">
      <p className="error">{error}</p>
      <button onClick={() => resetError()} className="m-0 btn button-error">
        Close
      </button>
    </div>
  );
};

export default ErrorModal;
