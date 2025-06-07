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

const MethodButtons = ({ handleMethod, equalsClicked }) => {
  const methods = ["+", "-", "x", "/"];

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

const ButtonsContainer = ({ val, setVal }) => {
  const [currentOperator, setCurrentOperator] = useState("");
  const [initialNumber, setInitialNumber] = useState(null);
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
      console.log(val, initialNumber);
      let value = operations[currentOperator](+val, +initialNumber);
      console.log(value);
      setInitialNumber(value);
    }
  };

  const equalsClicked = () => {
    console.log(val, currentOperator, initialNumber);
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
        <MethodButtonsTop />
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
