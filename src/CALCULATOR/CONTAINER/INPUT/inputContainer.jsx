import "./inputContainer.scss";

const InputContainer = ({ val, initialNumber, valueAboveZero }) => {
  console.log(val, initialNumber);
  return (
    <div className="inputContainer">
      <h1 className="inputText">
        {!valueAboveZero ? "-" : ""}
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
