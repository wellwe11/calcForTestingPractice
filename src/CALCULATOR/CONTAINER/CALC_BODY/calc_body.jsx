import ButtonsContainer from "../BUTTON/buttonsContainer";
import "./calc_body.scss";

const CalculatorContainer = ({ val, setVal }) => {
  return (
    <div className="calculatorContainer">
      <ButtonsContainer val={val} setVal={setVal} />
    </div>
  );
};

export default CalculatorContainer;
