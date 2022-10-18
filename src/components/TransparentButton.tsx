import classes from "./TransparentButton.module.css";
import { ButtonProps } from "./Button";

const TransparentButton = ({ label, ...props }: ButtonProps) => {
  return (
    <button {...props} className={classes.button}>
      {label}
    </button>
  );
};

export default TransparentButton;
