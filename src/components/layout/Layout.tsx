"use client"

// Layout.tsx nebo app.tsx
import {HeaderProvider} from "@/utils/HeaderContext"; // Import HeaderProvider
import Header from "./Header";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HeaderProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Main content area */}
          <div className="px-6 py-2 bg-gray-900 flex-1">
            {children}
          </div>
        </div>
      </div>
    </HeaderProvider>
  );
}
