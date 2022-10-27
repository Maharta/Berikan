import { ButtonHTMLAttributes } from "react";

export enum VerticalPosition {
  Top,
  Center,
  Bottom,
}

export enum HorizontalPosition {
  Left,
  Center,
  Right,
}

interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  vertical: VerticalPosition;
  horizontal: HorizontalPosition;
}

const FloatingButton = ({
  horizontal,
  vertical,
  ...props
}: FloatingButtonProps) => {
  const verticalClasses = {
    [VerticalPosition.Top]: "top-0",
    [VerticalPosition.Center]: "top-[50%] translate-y-[-50%]",
    [VerticalPosition.Bottom]: "bottom-0",
  };

  const horizontalClasses = {
    [HorizontalPosition.Left]: "left-0",
    [HorizontalPosition.Center]: "left-[50%] translate-x-[-50%]",
    [HorizontalPosition.Right]: "right-0",
  };

  const floatingButtonClasses =
    verticalClasses[vertical] +
    " " +
    horizontalClasses[horizontal] +
    " " +
    props.className;

  return (
    <button
      className={`bg-primary text-white px-4 py-2 rounded-full fixed ${floatingButtonClasses}`}>
      {props.children}
    </button>
  );
};

export default FloatingButton;
