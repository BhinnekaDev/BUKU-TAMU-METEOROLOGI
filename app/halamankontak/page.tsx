import React from "react";
import Footer from "@/components/Footer";
import CardKontak from "@/components/CardKontak";
import BgPageWhite from "@/components/BgPageWhite";

export default function page() {
  return (
    <BgPageWhite>
      <div className="flex-col flex justify-center items-center">
        <CardKontak />
      </div>
      <Footer />
    </BgPageWhite>
  );
}
