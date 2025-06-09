import "./calculator.scss";

import CalculatorContainer from "./CALC_BODY/calc_body";
import InputContainer from "./INPUT/inputContainer";
import ButtonsContainer from "./BUTTON/buttonsContainer";
import { useState } from "react";

const Calculator = () => {
  const [val, setVal] = useState(null);
  const [initialNumber, setInitialNumber] = useState(null);
  const [valueAboveZero, setValueAboveZero] = useState(true);

  return (
    <div className="calculator" data-testid="calculatorContainer">
      <InputContainer
        val={val}
        initialNumber={initialNumber}
        valueAboveZero={valueAboveZero}
      />
      <CalculatorContainer
        val={val}
        setVal={setVal}
        initialNumber={initialNumber}
        setInitialNumber={setInitialNumber}
        valueAboveZero={valueAboveZero}
        setValueAboveZero={setValueAboveZero}
      />
    </div>
  );
};

export default Calculator;
