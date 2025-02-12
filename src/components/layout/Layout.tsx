"use client";

import Header from "./Header";
import Sidebar from "@/components/layout/Sidebar";
import React, {useState} from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTextValue, setActiveTextValue] = useState<{ value: string; }>({value: "Dashboard"});
  const isLoggedIn = true;

  const handleHeaderValueChange = (value: string) => {
    setActiveTextValue({ value });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {isLoggedIn && (<Sidebar/>)}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header text={activeTextValue.value}/>

        {/* Main content area */}
        <div className="px-6 py-2 bg-gray-900 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
