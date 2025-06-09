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

  useEffect(() => {
    if (!resetClicked && +val) {
      setResetButton("C");
    }
  }, [val, initialNumber]);

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
    if (!initialNumber) {
      setVal(convertAmountVal);
    } else {
      setVal(convertAmountVal);
      setInitialNumber(+initialNumber + +convertAmountVal);
      setVal("");
    }
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

const MethodButtons = ({ handleMethod, equalsClicked, currentOperator }) => {
  const methods = ["/", "x", "-", "+"];

  return (
    <div className="methodButtonsRight">
      {methods.map((o, i) => (
        <div
          key={i}
          className="buttonContainer"
          style={{ border: currentOperator === o ? "1px solid red" : "" }}
        >
          <Button method={() => handleMethod(o)} key={i}>
            {o}
          </Button>
        </div>
      ))}
      <div className="buttonContainer">
        <Button method={equalsClicked}>{"="}</Button>
      </div>
    </div>
  );
};

const ButtonsContainer = ({
  val,
  setVal,
  initialNumber,
  setInitialNumber,
  valueAboveZero,
  setValueAboveZero,
}) => {
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
        if (!valueAboveZero) {
          setInitialNumber(+value - +value - +value);
        }

        if (valueAboveZero) {
          setInitialNumber(value);
        }
      }

      if (currentOperator === "/" || currentOperator === "x") {
        equalsClicked();
      }
      setValueAboveZero(true);
    }
  };

  const equalsClicked = () => {
    if (!initialNumber || !history) {
      return setVal(
        operations?.[history[0]?.operator || "+"](+val, +history[0]?.value)
      );
    }

    let copyHistory = [
      ...history.map((i) => ({ ...i })),
      { value: val, operator: null },
    ];

    for (let i = 0; i < copyHistory.length; i++) {
      const currentCalc = copyHistory[i];
      if (!currentCalc.value) continue;

      if (
        (currentCalc.operator === "x" || currentCalc.operations === "/") &&
        history?.length > 0
      ) {
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

    let result = copyHistory[0].value;
    for (let i = 0; i < copyHistory.length - 1; i++) {
      const op = copyHistory[i]?.operator || "+";
      const nextVal = +copyHistory[i + 1]?.value || +copyHistory[i]?.value;

      if (!isNaN(nextVal)) {
        result = operations[op](+copyHistory[i].value, +nextVal);
      }

      setInitialNumber("");
    }
    return setVal(result);
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
    turnNegative(o);
    handleInitialNumber();
  };

  const turnNegative = (o) => {
    if (+val === 0) {
      if (o === "+") {
        setValueAboveZero(true);
      }

      if (o === "-") {
        setValueAboveZero(false);
      }
    }
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
          currentOperator={currentOperator}
        />
      </div>
    </div>
  );
};

export default ButtonsContainer;
