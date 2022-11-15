import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavHeaderProps {
  title: string;
  backTo?: string;
  children: ReactNode;
  paddingTop?: string;
  paddingBot?: string;
}

const NavLayout = ({
  title,
  backTo = "/",
  children,
  paddingTop = "1rem",
  paddingBot = "1rem",
}: NavHeaderProps) => {
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
      <main
        style={{
          paddingTop,
          paddingBottom: paddingBot,
        }}
        className="font-roboto">
        {children}
      </main>
    </Fragment>
  );
};

export default NavLayout;
