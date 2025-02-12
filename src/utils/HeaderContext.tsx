"use client"

// utils/HeaderContext.tsx
import React, {createContext, ReactNode, useContext, useState} from "react";

// Definování typu pro Context
interface HeaderContextType {
  activeText: string;
  setActiveText: (value: string) => void;
}

// Vytvoření Contextu
const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

// Poskytovatel pro Context
export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeText, setActiveText] = useState("Dashboard");

  return (
    <HeaderContext.Provider value={{ activeText, setActiveText }}>
      {children}
    </HeaderContext.Provider>
  );
};

// Hook pro použití Contextu v komponentách
export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
