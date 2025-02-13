"use client"

import React, {createContext, ReactNode, useContext, useState} from "react";

// Typ pro kontext
interface DynamicComponentContextType {
  activeComponent: ReactNode;
  setActiveComponent: (component: ReactNode) => void;
}

// Vytvoření kontextu
const DynamicComponentContext = createContext<DynamicComponentContextType | undefined>(undefined);

// Poskytovatel kontextu
export function DynamicComponentProvider({ children }: { children: ReactNode }) {
  const [activeComponent, setActiveComponent] = useState<ReactNode>(null);

  return (
    <DynamicComponentContext.Provider value={{ activeComponent, setActiveComponent }}>
      {children}
    </DynamicComponentContext.Provider>
  );
}

// Vlastní hook pro použití kontextu
export function useDynamicComponent() {
  const context = useContext(DynamicComponentContext);
  if (!context) {
    throw new Error("useDynamicComponent must be wrapped inside DynamicComponentProvider");
  }
  return context;
}
