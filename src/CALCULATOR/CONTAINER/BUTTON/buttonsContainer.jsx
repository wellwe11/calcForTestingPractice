import "./buttonsContainer.scss";

import Button from "./button";
import { useEffect, useState } from "react";

const NumberButtons = ({ val, setVal, initialNumber, setInitialNumber }) => {
  const handleVal = (e) => {
    let input = e === 1 ? "." : e > 0 ? e - 1 : e;
    if (val === 0) {
      return setVal(input);
    } else {
      setVal((prev) => {
        if (input === "." && prev.toString().includes(".")) return prev;

        if (input === ".") {
          return (prev += ".");
        } else {
          let stringNr = (prev += input.toString());
          return (prev = stringNr);
        }
      });
    }

    console.log(val, initialNumber);
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
      setVal(0);
    }

    if (resetButton === "AC") {
      setVal(0);
      setInitialNumber(0);
    }

    setResetClicked(false);
  };

  const convertToNegative = () => {
    if (!val || +val === 0) return;
    const negated = +val * -1;
    return setVal(negated);
  };

  const convertProcent = () => {
    let convertToProcent = val / 100;
    if (!initialNumber) {
      setVal(+convertToProcent);
    } else if (initialNumber) {
      let preCalc = initialNumber * convertToProcent;
      setVal(+preCalc);
      if (preCalc) {
        setInitialNumber(+preCalc + +initialNumber);
        setVal(0);
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

    setVal(0);
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
    if (initialNumber) {
      let copyHistory = [
        ...history.map((i) => ({ ...i })),
        { value: +val, operator: null },
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

      const trimHistory = () => {
        let op = copyHistory[0]?.operator;

        if (op === null) return setVal(+copyHistory[0]?.value || 0);

        const currVal = +copyHistory[0].value;
        const nextVal = +copyHistory[1].value;

        const result = operations?.[op](currVal, nextVal);

        const nextOperator = copyHistory[1].operator;

        copyHistory.splice(0, 2, {
          value: result,
          operator: nextOperator || currentOperator,
        });

        setInitialNumber(result);
      };

      while (copyHistory.length > 1) {
        trimHistory();
      }
      setVal(0);
    }

    if (val === 0 && history.length > 0) {
      console.log(history, val, initialNumber);
      setInitialNumber(
        operations[currentOperator](
          initialNumber,
          history[history.length - 1].value || 0
        )
      );
    }
    return setVal(0);
  };

  const handleMethod = (o) => {
    setCurrentOperator(o);
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        value: +val,
        operator: o,
      },
    ]);

    turnNegative(o); // check if number is positive or negative
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
        <NumberButtons
          val={val}
          setVal={setVal}
          initialNumber={initialNumber}
          setInitialNumber={setInitialNumber}
        />
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
