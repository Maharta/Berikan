import { cva, VariantProps } from "cva";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const buttonStyles = cva(
  "py-4 tracking-widest px-14 w-52 h-14 rounded-3xl active:scale-110",
  {
    variants: {
      mode: {
        primary:
          "bg-primaryDark text-white font-bold border-none hover:bg-primaryLighterDark",
        transparent:
          "bg-none border-4 text-primaryDark leading-3 border-primaryDark hover:bg-[#e6eced]",
      },
    },
    defaultVariants: {
      mode: "primary",
    },
  }
);
interface Props extends ButtonProps, VariantProps<typeof buttonStyles> {}

const Button = ({ label, mode, ...props }: Props) => {
  return (
    <button
      {...props}
      className={buttonStyles({ mode, class: props.className })}>
      {label}
    </button>
  );
};

export default Button;
