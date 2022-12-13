import {
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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
        <form className="mr-auto flex w-max items-center rounded-full border border-black">
          <MagnifyingGlassIcon className="ml-3 h-5 w-5" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Cari disini. (WIP)"
            className="ml-2 mr-1 h-full rounded-full outline-none"
          />
        </form>
        <nav>
          <ul className="flex items-center gap-2">
            <li>
              <button>
                <ChatBubbleLeftIcon className="h-6 w-6" />
              </button>
            </li>
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
