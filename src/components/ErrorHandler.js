import React from "react";
import "../styles/error.css";

function ErrorHandler({ error }) {
  return (
    <div className="error-container">
      <h3 className="error-status">{error.status}</h3>
      <p className="error-message">{error.data.error}</p>
    </div>
  );
}

export default ErrorHandler;
