import { HTMLProps } from "react";
import classes from "./TextInput.module.css";

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  id: string;
  type: string;
  label: string;
  isInvalid: boolean;
}

const TextInput = ({
  id,
  label,
  type,
  isInvalid,
  ...inputProps
}: TextInputProps) => {
  const inputClasses = isInvalid
    ? `${classes.input} ${classes.invalid}`
    : classes.input;

  return (
    <div className={inputClasses}>
      <label htmlFor={id}>{label}</label>
      <input {...inputProps} type={type} id={id} />
    </div>
  );
};

export default TextInput;
