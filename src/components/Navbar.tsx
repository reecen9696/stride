import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";

type NavbarProps = {
  color: string; // Add color prop for dynamic logo color
};

const Navbar: React.FC<NavbarProps> = ({ color }) => {
  return (
    <nav className="fixed top-0 w-full h-16 flex items-center justify-center z-50">
      <Logo
        className="w-28 h-28 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-44 lg:h-44 xl:w-52 xl:h-52"
        style={{ fill: color }}
      />
    </nav>
  );
};

export default Navbar;
