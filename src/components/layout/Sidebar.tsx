// components/Sidebar.tsx
import React from "react";
import {useRouter} from "next/navigation";
import {useSession} from "@/utils/SessionContext";

interface SidebarItem {
  name: string;
  action: () => void;
}

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { clearUser } = useSession();

  const items: SidebarItem[] = [
    { name: "Databases", action: () => router.push("/databases") },
    { name: "Tables", action: () => router.push("/tables") },
    { name: "Queries", action: () => router.push("/queries") },
    { name: "Settings", action: () => router.push("/settings") },
    { name: "Sign Out", action: () => clearUser()}
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-full">
      <h2 className="text-xl font-semibold">My Desktop Admin</h2>
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
