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
  const [resetClicked, setResetClicked] = useState(false);
  const [resetButton, setResetButton] = useState("AC");

  // AC > C
  // AC reset current input
  // C resets whole calculator

  useEffect(() => {
    if (!resetClicked && +val) {
      setResetButton("C");
    }
  }, [val, initialNumber]);

  // show C if
  // Any number is clicked (val has any value)

  // Show AC if
  // Nothing is in calculator
  // val has no value

  const handleReset = () => {
    setResetClicked(true);
    if (resetButton === "C") {
      setResetButton("AC");
      setVal("0");
    }

    if (resetButton === "AC") {
      setVal("0");
      setInitialNumber("0");
    }

    setResetClicked(false);
  };

  const convertToNegative = () => {
    let convertAmount = initialNumber - initialNumber - initialNumber;
    setInitialNumber(convertAmount);
  };

  const convertProcent = () => {
    let convertToProcent = val / 100;
    if (!initialNumber) {
      setVal(convertToProcent);
    } else if (initialNumber) {
      let preCalc = initialNumber * convertToProcent;
      setVal(preCalc);
      if (preCalc) {
        setInitialNumber(+preCalc + +initialNumber);
      }
    }
    setVal("0");
  };

  return (
    <div className="methodTopButtons">
      <Button method={handleReset}>{resetButton}</Button>
      <Button method={convertToNegative}>{"+/-"}</Button>
      <Button method={convertProcent}>{"%"}</Button>
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
