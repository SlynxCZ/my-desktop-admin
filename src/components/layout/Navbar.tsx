import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-fp-header p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/public" className="text-fp-yellow text-xl font-bold">My Desktop Admin</Link>
        {/*<div>
          <Link href="/login" className="text-fp-text hover:text-fp-yellow mx-2">Login</Link>
          <Link href="/about" className="text-fp-text hover:text-fp-yellow mx-2">About</Link>
        </div>*/}
      </div>
    </nav>
  );
}