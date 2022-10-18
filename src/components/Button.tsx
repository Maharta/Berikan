import { HTMLAttributes } from "react";
import classes from "./Button.module.css";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`${classes.button} ${props.className}`}>
      {label}
    </button>
  );
};

export default Button;
