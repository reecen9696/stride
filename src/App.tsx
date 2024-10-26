import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
    </div>
  );
}

export default App;
