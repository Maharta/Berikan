import SearchInput from "@/components/SearchInput";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface MainHeaderProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainHeaderProps) => {
  return (
    <Fragment>
      <header className="flex justify-start p-2">
        <SearchInput />
        <nav>
          <ul className="flex items-center gap-2">
            <li>
              <NavLink to="/account">
                <UserCircleIcon className="h-6 w-6" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="px-4">{children}</main>
    </Fragment>
  );
};

export default MainLayout;
