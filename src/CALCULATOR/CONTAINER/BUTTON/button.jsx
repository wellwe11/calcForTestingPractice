import "./button.scss";

const Button = ({ children, method }) => {
  return (
    <button onClick={method} className="button">
      {children}
    </button>
  );
};

export default Button;
