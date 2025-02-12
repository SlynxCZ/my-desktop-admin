// components/Header.tsx
import {useHeader} from "@/utils/HeaderContext";

export default function Header() {
  const { activeText } = useHeader();

  return (
    <div className="bg-gray-900 p-4 text-white">
      <h1 className="text-3xl">{activeText}</h1>
    </div>
  );
};