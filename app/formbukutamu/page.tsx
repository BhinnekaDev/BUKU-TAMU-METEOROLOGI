import React from "react";
import BgPage from "@/components/BgPage";
import CardForm from "@/components/CardForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <BgPage>
      <Navbar />

      <div className="flex justify-center mt-30 items-start min-h-screen">
        <CardForm />
      </div>

      <div className="flex gap-4 justify-center items-start"></div>
      <Footer />
    </BgPage>
  );
}
