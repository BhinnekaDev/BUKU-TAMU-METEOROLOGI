import React from "react";
import { BgPageWhiteProps } from "@/interfaces/BgPageWhiteProps";

export default function BgPageWhite({ children }: BgPageWhiteProps) {
  return (
    <section
      className="flex flex-col min-h-screen w-full bg-cover bg-center bg-no-repeat font-[var(--font-monserrat)] text-blue bg-[FFFFFF]/85"
      style={{ backgroundImage: "url('/BgGedung.png')" }}
    >
      <main className="flex flex-col  text-white space-y-6 ">{children}</main>
    </section>
  );
}
