// components/Header.tsx
import React from "react";

export default function Header({ text } : { text: string; }) {
  return (
    <div className="bg-gray-900 p-4 text-white">
      <h1 className="text-3xl">{text}</h1>
    </div>
  );
};