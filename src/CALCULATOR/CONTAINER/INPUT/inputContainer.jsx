import { useState } from "react";
import "./inputContainer.scss";

const InputContainer = ({ val }) => {
  return (
    <div className="inputContainer">
      <h1>{val ? val : 0}</h1>
    </div>
  );
};

export default InputContainer;
