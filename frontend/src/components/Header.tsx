import { MdMenu } from "react-icons/md";
import ProfileDropDown from "./ProfileDropDown";

interface HeaderProps {
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Header({ setShowNavbar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-gray-400 bg-gray-200">
      <div>
        <MdMenu
          size="25"
          onClick={() => setShowNavbar((prev) => !prev)}
          className="ml-3 cursor-pointer"
        />
      </div>
      <ProfileDropDown />
    </header>
  );
}
