// import React, { createContext, useState, ReactNode } from "react";

// interface ThemeContextProps {
//   theme: string;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// interface ThemeProviderProps {
//   children: ReactNode;
// }

// const ThemeProvider = ({ children }: ThemeProviderProps) => {
//   const [theme, setTheme] = useState<string>("light");

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export { ThemeContext, ThemeProvider };
import React from 'react'

const ThemeContext = () => {
  return (
    <div>ThemeContext</div>
  )
}

export default ThemeContext