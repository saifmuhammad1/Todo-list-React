import { MoonStar, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./button";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="flex justify-between bg-white px-4 dark:bg-gray-800 items-center py-4">
      <div>
        <p className="text-[#6C63FF] text-2xl font-bold">Todo List</p>
      </div>
      <Button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded-lg bg-[#6C63FF] text-white  dark:text-black dark:bg-white "
      >
        {darkMode ? <Sun /> : <MoonStar />}
      </Button>
    </nav>
  );
};

export default Navbar;
