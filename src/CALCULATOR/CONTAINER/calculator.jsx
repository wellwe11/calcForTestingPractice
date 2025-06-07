import "./calculator.scss";

import CalculatorContainer from "./CALC_BODY/calc_body";
import InputContainer from "./INPUT/inputContainer";
import ButtonsContainer from "./BUTTON/buttonsContainer";

const Calculator = () => {
  return (
    <div className="calculator">
      <InputContainer />
      <CalculatorContainer />
    </div>
  );
};

export default Calculator;
