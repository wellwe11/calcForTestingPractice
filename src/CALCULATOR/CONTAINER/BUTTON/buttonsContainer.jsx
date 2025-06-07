import "./buttonsContainer.scss";

import Button from "./button";

const NumberButtons = () => {
  const numberButtons = [0, ",", 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="numberButtons">
      {numberButtons.map((n, i) => (
        <span
          className={`${"numberButtonContainer"} ${
            i === 0 ? "biggerNumberButtonContainer" : ""
          }`}
        >
          <Button key={i}>{n}</Button>
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
