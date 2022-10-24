import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = (props: CardProps) => {
  return <div className={`card ${props.className}`}>{props.children}</div>;
};

export default Card;
