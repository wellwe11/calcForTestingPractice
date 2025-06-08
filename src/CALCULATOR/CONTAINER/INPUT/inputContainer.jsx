import "./inputContainer.scss";

const InputContainer = ({ val, initialNumber }) => {
  return (
    <div className="inputContainer">
      <h1>
        {!initialNumber
          ? val
            ? val
            : 0
          : initialNumber
          ? val > 0
            ? val
            : initialNumber
          : val}
      </h1>
    </div>
  );
};

export default InputContainer;
