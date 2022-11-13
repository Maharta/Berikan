import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavHeaderProps {
  title: string;
  backTo?: string;
  children: ReactNode;
}

const NavLayout = ({ title, backTo = "/", children }: NavHeaderProps) => {
  return (
    <Fragment>
      <header>
        <nav className="flex items-center gap-3 p-2">
          <Link to={backTo}>
            <ArrowLeftIcon className="h-5 w-5 font-bold" />
          </Link>
          <h1 className="font-bold">{title}</h1>
        </nav>
      </header>
      <main className="py-4 font-roboto">{children}</main>
    </Fragment>
  );
};

export default NavLayout;
