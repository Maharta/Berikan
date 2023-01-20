import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import styles from "./VerticalDots.module.css";

interface VerticalDotsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
}

function VerticalDots({ className, ...props }: VerticalDotsProps) {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;

    const rect = target.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    if (props.onClick) props.onClick(e);
  };

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => {
        setIsRippling(false);
      }, 300);
    } else {
      setIsRippling(false);
    }
  }, [coords]);

  return (
    <button
      onClick={onClickHandler}
      className={`${styles["dots-button"]} ${className}`}>
      {isRippling && (
        <span
          style={{ left: coords.x, top: coords.y }}
          className={styles.ripples}
        />
      )}
    </button>
  );
}

export default VerticalDots;
