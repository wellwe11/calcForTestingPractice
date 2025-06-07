import "./buttonsContainer.scss";

import Button from "./button";

const NumberButtons = () => {
  return (
    <div className="numberButtons">
      {[...Array(11).keys()].map((n, i) => (
        <span
          className={`${"numberButtonContainer"} ${
            i === 0 ? "biggerNumberButtonContainer" : ""
          }`}
        >
          <Button key={i}>{i === 1 ? "," : i > 0 ? i - 1 : i}</Button>
        </span>
      ))}
    </div>
  );
};

const MethodButtonsTop = () => {
  const methods = ["C", "+/-", "%"];

  return (
    <div className="methodTopButtons">
      {methods.map((t, i) => (
        <Button key={i}>{t}</Button>
      ))}
    </div>
  );
};

const MethodButtons = () => {
  const methods = ["+", "-", "x", "/", "="];

  return (
    <div className="methodButtonsRight">
      {methods.map((t, i) => (
        <Button key={i}>{t}</Button>
      ))}
    </div>
  );
};

const ButtonsContainer = () => {
  return (
    <div className="buttonsContainer">
      <div className="mainButtons">
        <MethodButtonsTop />
        <NumberButtons />
      </div>
      <div className="sideButtons">
        <MethodButtons />
      </div>
    </div>
  );
};

export default ButtonsContainer;
