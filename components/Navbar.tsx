"use client";
import Link from "next/link";
import IconBmkg from "@/components/IconBmkg";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkStyle = (path: string) => `
    relative transition duration-300 ease-in-out 
    hover:text-white font-semibold tracking-wide
    ${
      pathname === path
        ? "text-white after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-400 after:animate-pulse"
        : "text-white"
    }
  `;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="backdrop-blur-md bg-gradient-to-r from-[#1A6EB5]/80 to-[#073CA4]/40 text-white px-4 md:px-8 py-3 shadow-md flex justify-between items-center text-sm">
        {/* Logo */}
        <IconBmkg logo="/LogoBmkgSmall.png" text="BMKG PROVINSI BENGKULU" />

        {/* Link Menu */}
        <div className="flex space-x-4 md:space-x-8 font-medium text-sm tracking-wide items-center">
          <Link href="/" className={linkStyle("/")}>
            BERANDA
          </Link>
          <Link href="/formbukutamu2" className={linkStyle("/formbukutamu2")}>
            BUKU TAMU
          </Link>
          <Link href="/halamanfaq" className={linkStyle("/halamanfaq")}>
            FAQ
          </Link>
        </div>
      </nav>
    </div>
  );
}
