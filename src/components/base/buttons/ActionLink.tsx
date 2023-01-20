import { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface ActionTextProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  to: string;
}
function ActionLink({ to, ...props }: ActionTextProps) {
  return <Link
    to={to}
    {...props}
    className={`tracking-widest text-primaryDark underline ${props.className}`}>
    {props.children}
  </Link>
}

export default ActionLink;
