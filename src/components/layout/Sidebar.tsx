// components/Sidebar.tsx
import React from "react";

interface SidebarItem {
  name: string;
  link: string;
}

const Sidebar: React.FC = () => {
  const items: SidebarItem[] = [
    { name: "Databases", link: "/databases" },
    { name: "Tables", link: "/tables" },
    { name: "Queries", link: "/queries" },
    { name: "Settings", link: "/settings" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-full">
      <h2 className="text-xl font-semibold">My Desktop Admin</h2>
      <nav className="mt-6">
        <ul>
          {items.map((item) => (
            <li key={item.name} className="py-2 hover:bg-gray-700 rounded">
              <a href={item.link} className="block">{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
