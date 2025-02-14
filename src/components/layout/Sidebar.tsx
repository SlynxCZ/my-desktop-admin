"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {useSession} from "@/utils/SessionContext";
import QueryExecutor from "@/components/Query";
import {useDynamicComponent} from "@/utils/DynamicComponent";

interface SidebarItem {
  name: string;
  action: () => void;
}

const Sidebar: React.FC = () => {
  const { setActiveComponent } = useDynamicComponent();
  const router = useRouter();
  const { clearSession } = useSession();

  const items: SidebarItem[] = [
    { name: "Query", action: () => setActiveComponent(<QueryExecutor />) },
    { name: "Sign Out", action: () => clearSession() }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-full">
      <h2 className="text-xl font-semibold cursor-pointer" onClick={() => router.push("/")}>
        My Desktop Admin
      </h2>
      <nav className="mt-6">
        <ul>
          {items.map((item) => (
            <li
              key={item.name}
              className="py-2 hover:bg-gray-700 rounded cursor-pointer"
              onClick={item.action}
            >
              <a className="block">{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
