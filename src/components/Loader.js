import React from "react";
import "../styles/loader.css";

function Loader() {
  return (
    <div className="spinner">
      <div className="lds-dual-ring"></div>
    </div>
  );
}

export default Loader;
