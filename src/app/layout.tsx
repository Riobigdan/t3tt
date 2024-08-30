import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function TopNav() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 p-4 text-xl">
      <Link href="/" className="font-bold text-white">
        Home
      </Link>
      <Link href="/layer2" className="font-bold text-white">
        Layer 2
      </Link>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
