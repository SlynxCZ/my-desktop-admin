"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container mx-auto md:max-w-screen-2xl md:my-16 rounded-t-md">
        <Navbar />
        <div className="bg-fp-backdark min-h-[100px] p-4 border-x border-b border-fp-lightdark py-16">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}
