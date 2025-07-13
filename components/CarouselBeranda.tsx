"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    image: "/BgBeranda.png",
    title: "BMKG Stasiun Meteorologi",
    description: "Melayani informasi cuaca dan penerbangan.",
  },
  {
    image: "/FLAT DESIGN BMKG.png",
    title: "BMKG Stasiun Klimatologi",
    description: "Menyediakan data iklim dan perubahan cuaca.",
  },
  {
    image: "/GEDUNG METEOROLOGI.png",
    title: "BMKG Stasiun Meteorologi",
    description: "Memantau aktivitas gempa dan tsunami.",
  },
  {
    image: "/FLAT DESAIN BMKG.png",
    title: "BMKG PROVINSI BENGKULU",
    description: "Memantau aktivitas gempa dan tsunami.",
  },
];

export default function CarouselBeranda() {
  return (
    <div className="w-full max-w-xl mx-auto relative z-10">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="rounded-2xl shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-auto aspect-video object-cover object-center rounded-2xl"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-transparant text-white text-center p-4 rounded-b-2xl">
                <h3 className="text-lg font-semibold">{slide.title}</h3>
                <p className="text-sm">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
