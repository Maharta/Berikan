import { cva } from "cva";
import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  label: string;
  isInvalid: boolean;
  inputClass?: string;
}

const inputStyles = cva(
  "border-2 mx-auto block w-full max-w-xs p-2 rounded-sm"
);

function TextInput({
  id,
  label,
  type,
  isInvalid,
  className,
  inputClass,
  ...inputProps
}: TextInputProps) {
  return (
    <div className={className}>
      <label className="my-0 mx-auto block w-full max-w-xs" htmlFor={id}>
        {label}
      </label>
      <input
        style={{
          border: isInvalid ? "2px solid red" : "",
        }}
        {...inputProps}
        className={inputStyles({ class: inputClass })}
        type={type}
        id={id}
      />
    </div>
  );
}

export default TextInput;
