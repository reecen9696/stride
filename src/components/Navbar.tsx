import React from "react";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <nav className=" fixed top-0 w-full h-16 flex items-center justify-center z-50">
      <img src={Logo} alt="Stride Logo" />
    </nav>
  );
};

export default Navbar;
