import ButtonsContainer from "../BUTTON/buttonsContainer";
import "./calc_body.scss";

const CalculatorContainer = ({
  val,
  setVal,
  initialNumber,
  setInitialNumber,
  valueAboveZero,
  setValueAboveZero,
}) => {
  return (
    <div className="calculatorContainer">
      <ButtonsContainer
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

export default CalculatorContainer;
