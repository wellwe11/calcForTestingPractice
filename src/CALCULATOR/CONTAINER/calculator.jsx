import "./calculator.scss";

import CalculatorContainer from "./CALC_BODY/calc_body";
import InputContainer from "./INPUT/inputContainer";
import ButtonsContainer from "./BUTTON/buttonsContainer";
import { useState } from "react";

const Calculator = () => {
  const [val, setVal] = useState(null);

  return (
    <div className="calculator">
      <InputContainer val={val} />
      <CalculatorContainer val={val} setVal={setVal} />
    </div>
  );
};

export default Calculator;
