import { cva } from "cva";
import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  label: string;
  isInvalid: boolean;
}

const inputStyles = cva(
  "border-[1.2] mx-auto block w-[80%] max-w-xs border-black p-2"
);

const TextInput = ({
  id,
  label,
  type,
  isInvalid,
  className,
  ...inputProps
}: TextInputProps) => {
  return (
    <div className="w-full ">
      <label className="my-0 mx-auto block w-[80%] max-w-xs" htmlFor={id}>
        {label}
      </label>
      <input
        style={{
          border: isInvalid ? "2px solid red" : "",
        }}
        {...inputProps}
        className={inputStyles({ class: className })}
        type={type}
        id={id}
      />
    </div>
  );
};

export default TextInput;
