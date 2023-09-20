import { FC } from "react";
import Link from "next/link";

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: FC<HeaderProps> = ({ isAuthenticated }) => {
  return (
    <div className="border-b-[1px] border-[#e5e7eb] py-1 flex justify-center">
      {isAuthenticated ? (
        <h1 className="border-1 rounded-[6px] py-[0.5rem] px-1">
          Your Gallery
        </h1>
      ) : (
        ""
      )}
    </div>
  );
};
export default Header;
