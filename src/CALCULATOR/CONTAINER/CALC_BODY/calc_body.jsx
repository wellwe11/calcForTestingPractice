import ButtonsContainer from "../BUTTON/buttonsContainer";
import "./calc_body.scss";

const CalculatorContainer = ({
  val,
  setVal,
  initialNumber,
  setInitialNumber,
}) => {
  return (
    <div className="calculatorContainer">
      <ButtonsContainer
        val={val}
        setVal={setVal}
        initialNumber={initialNumber}
        setInitialNumber={setInitialNumber}
      />
    </div>
  );
};

export default CalculatorContainer;
