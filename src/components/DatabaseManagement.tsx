// components/DatabaseManagement.tsx
import React from "react";

const DatabaseManagement: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl text-white mb-4">Manage Databases</h2>
      <table className="min-w-full text-white">
        <thead>
        <tr>
          <th className="px-4 py-2 border-b">Database Name</th>
          <th className="px-4 py-2 border-b">Actions</th>
        </tr>
        </thead>
        <tbody>
        {/* Dynamické generování databází */}
        <tr className="hover:bg-gray-700">
          <td className="px-4 py-2 border-b">Database1</td>
          <td className="px-4 py-2 border-b">
            <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-400">
              Manage
            </button>
          </td>
        </tr>
        <tr className="hover:bg-gray-700">
          <td className="px-4 py-2 border-b">Database2</td>
          <td className="px-4 py-2 border-b">
            <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-400">
              Manage
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DatabaseManagement;
