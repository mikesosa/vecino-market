import React, { createContext, useState } from "react";

export const ThemeContext = createContext("");

export default function ThemeContextProvider(props) {
  const [isDarkMode, setIsDarkMode] = useState(true);

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
