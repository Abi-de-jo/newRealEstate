import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition-all duration-300"
    >
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transform transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1M12 20v1m9-9h1M3 12H2m15.36-8.36l-.707.707M5.64 18.36l-.707.707M18.36 18.36l-.707-.707M5.64 5.64l-.707-.707"
          />
          <circle cx="12" cy="12" r="5" fill="currentColor" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transform transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h1m-16 0H2m15.36-8.36l-.707.707M5.64 18.36l-.707.707M18.36 18.36l-.707-.707M5.64 5.64l-.707-.707"
          />
          <path d="M3 12a9 9 0 018-8.736V12H3z" fill="currentColor" />
        </svg>
      )}
      <span className="ml-2">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
    </button>
  );
};

export default ThemeToggle;
