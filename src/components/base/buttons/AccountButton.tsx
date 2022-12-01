import { cva, VariantProps } from "cva";
import { ButtonHTMLAttributes } from "react";

interface AccountButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const accountButtonStyles = cva(
  "rounded-xl tracking-widest font-semibold bg-primaryLighterDark text-white",
  {
    variants: {
      marginTop: {
        0: "mt-0",
        2: "mt-2",
        4: "mt-4",
        6: "mt-6",
        8: "mt-8",
      },
      centered: {
        true: "block mx-auto",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-6 py-3",
      },
    },
    defaultVariants: {
      marginTop: 4,
      size: "md",
      centered: true,
    },
  }
);

interface Props
  extends VariantProps<typeof accountButtonStyles>,
    AccountButtonProps {}

const AccountButton = ({
  centered,
  marginTop,
  size,
  className,
  label,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={accountButtonStyles({
        centered: centered,
        marginTop: marginTop,
        size: size,
        class: className,
      })}>
      {label}
    </button>
  );
};

export default AccountButton;
