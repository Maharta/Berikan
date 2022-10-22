import {
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className="p-2 flex justify-start">
      <form className="border border-black rounded-full w-max mr-auto flex items-center">
        <MagnifyingGlassIcon className="w-5 h-5 ml-3" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Cari di sini."
          className="rounded-full h-full outline-none ml-2 mr-1"
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
  );
};

export default MainHeader;
