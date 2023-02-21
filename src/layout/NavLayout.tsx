import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavHeaderProps {
  title: string;
  children: ReactNode;
  paddingTop?: string;
  paddingBot?: string;
  backTo?: string;
}

function NavLayout({
  title,
  children,
  paddingTop = "1rem",
  paddingBot = "1rem",
  backTo = "..",
}: NavHeaderProps) {
  return (
    <>
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
        className="mx-auto h-full max-w-sm font-roboto">
        {children}
      </main>
    </>
  );
}

export default NavLayout;
