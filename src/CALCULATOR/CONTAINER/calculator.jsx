import "./calculator.scss";

import CalculatorContainer from "./CALC_BODY/calc_body";
import InputContainer from "./INPUT/inputContainer";
import ButtonsContainer from "./BUTTON/buttonsContainer";
import { useState } from "react";

const Calculator = () => {
  const [val, setVal] = useState(null);
  const [initialNumber, setInitialNumber] = useState(null);

  return (
    <div className="calculator" data-testid="calculatorContainer">
      <InputContainer val={val} initialNumber={initialNumber} />
      <CalculatorContainer
        val={val}
        setVal={setVal}
        initialNumber={initialNumber}
        setInitialNumber={setInitialNumber}
      />
    </div>
  );
};

export default Calculator;
