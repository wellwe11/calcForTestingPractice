import "./buttonsContainer.scss";

import Button from "./button";
import { useEffect, useState } from "react";

const NumberButtons = ({ val, setVal }) => {
  const handleVal = (e) => {
    let input = e === 1 ? "," : e > 0 ? e - 1 : e;
    if (val === "0") {
      setVal(input);
    } else {
      setVal((prev) => (prev += `${input}`));
    }
  };

  return (
    <div className="numberButtons">
      {[...Array(11).keys()].map((n, i) => (
        <div
          className={`${"numberButtonContainer"} ${
            i === 0 ? "biggerNumberButtonContainer" : ""
          }`}
          key={i}
          onClick={() => handleVal(i)}
        >
          <Button key={i}>{i === 1 ? "," : i > 0 ? i - 1 : i}</Button>
        </div>
      ))}
    </div>
  );
};

const MethodButtonsTop = ({ val, setVal, initialNumber, setInitialNumber }) => {
  const methods = ["+/-", "%"];

  // AC > C
  // AC reset current input
  // C resets whole calculator

  let showClear = val > 0 || initialNumber;

  const handleReset = () => {
    if (val && !initialNumber) {
      setVal("0");
    }
    console.log(val, initialNumber);
  };

  return (
    <div className="methodTopButtons">
      <Button method={handleReset}>{showClear ? "C" : "AC"}</Button>
      {methods.map((t, i) => (
        <Button key={i}>{t}</Button>
      ))}
    </div>
  );
};

const MethodButtons = ({ handleMethod, equalsClicked }) => {
  const methods = ["/", "x", "-", "+"];

  return (
    <div className="methodButtonsRight">
      {methods.map((o, i) => (
        <Button method={() => handleMethod(o)} key={i}>
          {o}
        </Button>
      ))}
      <Button method={equalsClicked}>{"="}</Button>
    </div>
  );
};

const ButtonsContainer = ({ val, setVal, initialNumber, setInitialNumber }) => {
  const [currentOperator, setCurrentOperator] = useState("");
  const [history, setHistory] = useState([]);

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => b - a,
    x: (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  useEffect(() => {
    // console.log(+val, currentOperator, +initialNumber);
    if (!initialNumber) {
      setInitialNumber(val);
    }

    setVal("0");
  }, [history]);

  const handleInitialNumber = () => {
    if (initialNumber) {
      let value = operations[currentOperator](+val, +initialNumber);
      setInitialNumber(value);
    }
  };

  const equalsClicked = () => {
    setVal(operations[currentOperator](+val, +initialNumber));
    setInitialNumber(null);
  };

  const handleMethod = (o) => {
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        value: val,
        operator: o,
      },
    ]);
    setCurrentOperator(o);
    handleInitialNumber();
  };

  console.log(history);

  return (
    <div className="buttonsContainer">
      <div className="mainButtons">
        <MethodButtonsTop
          val={val}
          setVal={setVal}
          initialNumber={initialNumber}
          setInitialNumber={setInitialNumber}
        />
        <NumberButtons val={val} setVal={setVal} />
      </div>
      <div className="sideButtons">
        <MethodButtons
          handleMethod={handleMethod}
          equalsClicked={equalsClicked}
        />
      </div>
    </div>
  );
};

export default ButtonsContainer;
