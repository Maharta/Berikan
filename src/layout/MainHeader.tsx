import {
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";

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
      <nav className="flex items-center gap-2">
        <ChatBubbleLeftIcon className="h-6 w-6" />
        <UserCircleIcon className="h-6 w-6" />
      </nav>
    </header>
  );
};

export default MainHeader;
