import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";

type NavbarProps = {
  color: string; // Add color prop for dynamic logo color
};

const Navbar: React.FC<NavbarProps> = ({ color }) => {
  return (
    <nav className="fixed top-0 w-full h-16 flex items-center justify-center z-50">
      <Logo className="w-28 h-28" style={{ fill: color }} />
    </nav>
  );
};

export default Navbar;
