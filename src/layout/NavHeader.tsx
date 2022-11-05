import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface NavHeaderProps {
  title: string;
  backTo?: string;
}

const NavHeader = ({ title, backTo = "/" }: NavHeaderProps) => {
  return (
    <header>
      <nav className="flex items-center gap-3 p-2">
        <Link to={backTo}>
          <ArrowLeftIcon className="h-5 w-5 font-bold" />
        </Link>
        <h1 className="font-bold">{title}</h1>
      </nav>
      <br />
    </header>
  );
};

export default NavHeader;
