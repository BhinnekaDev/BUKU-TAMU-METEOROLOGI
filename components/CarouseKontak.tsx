import React, { useRef, useState, useEffect } from "react";
import CardKontak from "./CardKontak";
import CardKontakMeteo from "./CardKontakMeteo";
import CardKontakGeofisika from "./CardKontakGeofisika";
import CardKontakKepahiang from "./CardKontakKepahiang";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CarouselKontak() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 4;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: index * width,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % totalCards;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mx-auto py-6 sm:py-10 px-4 sm:px-10">
      {/* Tombol Kiri */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-4 bg-white text-blue-800 p-2 sm:p-3 rounded-full z-20 hover:scale-110 transition"
      >
        <FaChevronLeft className="text-base sm:text-lg cursor-pointer" />
      </button>

      {/* Kontainer Carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll no-scrollbar scroll-smooth snap-x snap-mandatory w-full"
      >
        {[
          CardKontakMeteo,
          CardKontak,
          CardKontakGeofisika,
          CardKontakKepahiang,
        ].map((Component, i) => (
          <div
            key={i}
            className="min-w-full snap-center flex justify-center px-2 sm:px-4 py-4"
          >
            <div className="w-full max-w-[1024px]">
              <Component />
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Kanan */}
      <button
        onClick={() => scroll("right")}
        className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-4 bg-white text-blue-800 p-2 sm:p-3 rounded-full z-20 hover:scale-110 transition"
      >
        <FaChevronRight className="text-base sm:text-lg cursor-pointer" />
      </button>

      {/* Indikator */}
      <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
        {Array.from({ length: totalCards }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`h-2.5 sm:h-3 rounded-full transition-all duration-600 ${
              currentIndex === i
                ? "w-5 sm:w-6 bg-white"
                : "w-2.5 sm:w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
