import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  mode?: string;
}

const Button = ({ label, mode, ...props }: ButtonProps) => {
  const primaryClasses =
    "py-4 tracking-widest px-14 w-52 h-14 rounded-3xl active:scale-110";
  const modeClasses = {
    default:
      "bg-primaryDark text-white font-bold border-none hover:bg-primaryLighterDark",
    transparent:
      "bg-none border-4 text-primaryDark leading-3 border-primaryDark hover:bg-[#e6eced]",
  };

  const secondaryClasses =
    mode === "transparent" ? modeClasses.transparent : modeClasses.default;

  return (
    <button
      {...props}
      className={
        primaryClasses + " " + secondaryClasses + " " + props.className
      }
    >
      {label}
    </button>
  );
};

export default Button;
