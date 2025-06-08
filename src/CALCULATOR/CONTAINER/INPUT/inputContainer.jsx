import "./inputContainer.scss";

const InputContainer = ({ val, initialNumber }) => {
  return (
    <div className="inputContainer">
      <h1 className="inputText">
        {!initialNumber
          ? val
            ? val
            : 0
          : initialNumber
          ? val > 0
            ? val
            : initialNumber
          : val === "."
          ? ","
          : val}
      </h1>
    </div>
  );
};

export default InputContainer;
