import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const ThemeContext = createContext("");

export default function ThemeContextProvider(props) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const classes = Object.values(document.documentElement.classList);
    if (classes.includes("dark")) setIsDarkMode(true);
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
