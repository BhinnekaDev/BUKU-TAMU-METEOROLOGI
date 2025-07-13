"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BgPage from "@/components/BgPage";
import Button from "@/components/Button";
import CardFaq from "@/components/CardFaq";
import TextBarcodeFaq from "@/components/TextBarcodeFaq";
import TextFormFaq from "@/components/TextFormFaq";
import TextBerandaFaq from "@/components/TextBerandaFaq";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const router = useRouter();
  const [activePage, setActivePage] = useState("Beranda");

  const renderContent = () => {
    switch (activePage) {
      case "Scan Barcode QR":
        return <TextBarcodeFaq />;
      case "Beranda":
        return <TextBerandaFaq />;
      case "Form Buku Tamu":
        return <TextFormFaq />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BgPage className="flex-1 flex flex-col">
        <Navbar />

        <div className="mt-40 text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Frequently Asked Questions
          </h1>
          <h2 className="text-sm sm:text-base md:text-xl font-light mt-2">
            Pertanyaan Seputar Buku Tamu BMKG? Temukan jawaban atas{" "}
            <br className="hidden sm:block" />
            prosedur, persyaratan, dan informasi lainnya di sini.
          </h2>
        </div>

        {/* ✅ Tombol Navigasi Responsive */}
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center text-center mt-6 px-2">
          <Button
            text="Barcode QR"
            onClick={() => setActivePage("Scan Barcode QR")}
            stylebutton={`text-sm sm:text-base border-2 py-1 sm:py-2 rounded-full px-4 sm:px-5 hover:cursor-pointer hover:bg-white hover:text-blue-900 transition ease-in-out delay-150 duration-300 ${
              activePage === "Scan Barcode QR"
                ? "bg-white text-blue-900"
                : "bg-transparent text-white"
            }`}
          />
          <Button
            text="Beranda"
            onClick={() => setActivePage("Beranda")}
            stylebutton={`text-sm sm:text-base border-2 py-1 sm:py-2 rounded-full px-4 sm:px-5 hover:cursor-pointer hover:bg-white hover:text-blue-900 transition ease-in-out delay-150 duration-300 ${
              activePage === "Beranda"
                ? "bg-white text-blue-900"
                : "bg-transparent text-white"
            }`}
          />
          <Button
            text="Buku Tamu"
            onClick={() => setActivePage("Form Buku Tamu")}
            stylebutton={`text-sm sm:text-base border-2 py-1 sm:py-2 rounded-full px-4 sm:px-5 hover:cursor-pointer hover:bg-white hover:text-blue-900 transition ease-in-out delay-150 duration-300 ${
              activePage === "Form Buku Tamu"
                ? "bg-white text-blue-900"
                : "bg-transparent text-white"
            }`}
          />
        </div>

        <div className="mt-8 sm:mt-10 flex justify-center flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl px-4 sm:px-6"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <Footer />
      </BgPage>
    </div>
  );
}
