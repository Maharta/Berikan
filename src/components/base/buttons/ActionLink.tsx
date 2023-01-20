import { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface ActionTextProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  to: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
function ActionLink({ to, onClick, ...props }: ActionTextProps) {
  return (
    <Link
      onClick={onClick}
      to={to}
      {...props}
      className={`tracking-widest text-primaryDark underline ${props.className}`}>
      {props.children}
    </Link>
  );
}

export default ActionLink;
