import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [logoColor, setLogoColor] = useState("black"); // Initial color for the logo

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar color={logoColor} /> {/* Pass logoColor to Navbar */}
      <main className="flex-grow">
        <Home setLogoColor={setLogoColor} /> {/* Pass setLogoColor to Home */}
      </main>
    </div>
  );
}

export default App;
