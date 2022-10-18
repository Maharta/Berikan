import { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface ActionTextProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  to: string;
}
const ActionLink = (props: ActionTextProps) => {
  return (
    <Link
      to={props.to}
      className={`text-primaryDark tracking-widest underline ${props.className}`}
    >
      {props.children}
    </Link>
  );
};

export default ActionLink;
