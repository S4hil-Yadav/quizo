import { Link, useLocation } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

interface NavBarProps {
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ showNavbar, setShowNavbar }: NavBarProps) {
  return (
    <div
      className={`fixed top-0 z-50 flex h-screen flex-col overflow-clip border-r-2 border-gray-300 bg-gray-100 transition-all md:sticky ${showNavbar ? "w-48 px-5" : "w-0 -translate-x-40"}`}
    >
      <MdArrowBackIos
        size="25"
        onClick={() => setShowNavbar((prev) => !prev)}
        className="absolute top-2 right-2 cursor-pointer rounded-full border border-black bg-gray-200 pl-[0.4rem] md:hidden"
      />
      <div className="my-5 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 py-2 text-2xl font-bold">
        <span className="text-white">Quizo</span>
      </div>
      <EventManagementLinks />
    </div>
  );
}

export function EventManagementLinks() {
  return (
    <div className="top-0 right-0 left-0 flex flex-col">
      <CustomLink to="/dashboard">Dashboard</CustomLink>
      <CustomLink to="/create-quiz">Create&nbsp;Quiz</CustomLink>
    </div>
  );
}

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

function CustomLink({ to, children }: CustomLinkProps) {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={`w-full rounded-lg py-1 text-center text-lg font-medium hover:bg-gray-300 ${location.pathname === to ? "text-violet-700 hover:text-violet-900" : "text-gray-700 hover:text-black"}`}
    >
      {children}
    </Link>
  );
}
