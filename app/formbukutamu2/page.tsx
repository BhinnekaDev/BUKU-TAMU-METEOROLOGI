import React from "react";
import BgPage from "@/components/BgPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardForm2 from "@/components/CardForm2";
export default function formbukutamu2() {
  return (
    <BgPage>
      <Navbar />

      <div className="flex justify-center mt-30 items-start min-h-screen">
        <CardForm2 />
      </div>

      <div className="flex gap-4 justify-center items-start"></div>
      <Footer />
    </BgPage>
  );
}
