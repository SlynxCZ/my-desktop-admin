"use client";

import Header from "./Header";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";
import {useSession} from "@/utils/SessionContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session } = useSession();

  return (
    <div className="flex h-screen">
      {session?.user && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="px-6 py-2 bg-gray-900 flex-1">{children}</div>
      </div>
    </div>
  );
}
