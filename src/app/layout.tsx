import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import Layout from "@/components/layout/Layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false
});

export const metadata: Metadata = {
  title: "My Desktop Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <title>{metadata.title?.toString()}</title>
      <link
        href={"https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"}
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
    </head>
    <body
      className={`${inter.className} antialiased`}
    >
    {/*<SessionProvider>*/}
      {/* eslint-disable-next-line react/no-children-prop */}
      <Layout children={children}/>
    {/*</SessionProvider>*/}
    </body>
    </html>
  );
}
