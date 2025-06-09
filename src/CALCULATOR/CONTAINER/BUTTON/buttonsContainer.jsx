import "./buttonsContainer.scss";

import Button from "./button";
import { useEffect, useState } from "react";

const NumberButtons = ({ val, setVal }) => {
  const handleVal = (e) => {
    let input = e === 1 ? "." : e > 0 ? e - 1 : e;
    if (val === "0") {
      setVal(input);
    } else {
      if (input === "." && !val.toString().split("").includes(".")) {
        setVal((prev) => (prev += `${input}`));
      } else if (input !== ".") {
        setVal((prev) => (prev += `${input}`));
      }
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
          <Button key={i}>{i === 1 ? "." : i > 0 ? i - 1 : i}</Button>
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
    let convertAmountVal = val - val - val;
    console.log(val, initialNumber, convertAmountVal);
    if (!initialNumber) {
      setVal(convertAmountVal);
    } else {
      setVal(convertAmountVal);
      setInitialNumber(+initialNumber + +convertAmountVal);
    }
    setVal("0");
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
        setVal("0");
      }
    }
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
    "-": (a, b) => a - b,
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
      if (currentOperator === "+" || currentOperator === "-") {
        let value = operations[currentOperator](+val, +initialNumber);
        setInitialNumber(value);
      }

      if (currentOperator === "/" || currentOperator === "x") {
        equalsClicked();
      }
    }
  };

  const equalsClicked = () => {
    console.log(val, initialNumber, history);
    if ((!val && !initialNumber) || !history) return;

    let copyHistory = [
      ...history.map((i) => ({ ...i })),
      { value: val, operator: null },
    ];

    for (let i = 0; i < copyHistory.length; i++) {
      const currentCalc = copyHistory[i];
      if (!currentCalc.value) continue;

      if (currentCalc.operator === "x" || currentCalc.operations === "/") {
        let nextObject = copyHistory[i + 1];

        const value = operations[currentCalc.operator](
          currentCalc.value,
          nextObject.value
        );

        copyHistory.splice(i, 2, {
          operator: nextObject.operator,
          value: value,
        });
      }
    }

    console.log(copyHistory);

    let result = copyHistory[0].value;
    for (let i = 0; i < copyHistory.length - 1; i++) {
      const op = copyHistory[i]?.operator;
      const nextVal = +copyHistory[i + 1]?.value || +copyHistory[i]?.value;

      if (!isNaN(nextVal)) {
        console.log(result, nextVal);
        result = operations[op](+result, +nextVal);
      }
    }

    setInitialNumber("");
    return setVal(result);
  };

  const handleMethod = (o) => {
    console.log(val);
    setCurrentOperator(o);
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        value: val,
        operator: o,
      },
    ]);
    handleInitialNumber();
  };

  return (
    <div className="buttonsContainer" data-testid="buttonsContainer">
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
