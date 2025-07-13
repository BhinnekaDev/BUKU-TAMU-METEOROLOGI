"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import CardKunjungan from "@/components/CardKunjungan";
import Footer from "@/components/Footer";
import CarouselKontak from "@/components/CarouseKontak";
import CarouselBeranda from "@/components/CarouselBeranda";

export default function BerandaMeteorologi() {
    const router = useRouter();

    const [dataKunjungan, setDataKunjungan] = useState({
        hariIni: 0,
        mingguIni: 0,
        bulanIni: 0,
    });

    const namaStasiun = "Stasiun Meteorologi";
    const idStasiun = "f72d6a9f-4c33-4de6-a6b1-4318ac658f70"; // ID Meteorologi

    const handleStart = () => {
        sessionStorage.setItem("selectedStasiunId", idStasiun);
        sessionStorage.setItem("selectedStasiunName", "Meteorologi");
        router.push("/formbukutamu2");
    };

    useEffect(() => {
        const fetchDataKunjungan = async () => {
            try {
                const res = await fetch(
                    `https://buku-tamu-mkg-datbase-production.up.railway.app/api/pengunjung/jumlah?id_stasiun=${idStasiun}`
                );

                if (!res.ok) throw new Error("Gagal mengambil data kunjungan");

                const data = await res.json();
                setDataKunjungan({
                    hariIni: data.hariIni,
                    mingguIni: data.mingguIni,
                    bulanIni: data.bulanIni,
                });
            } catch (error) {
                console.error("Error saat fetch data kunjungan:", error);
            }
        };

        fetchDataKunjungan();
    }, []);

    return (
        <div className="relative mx-auto flex flex-col w-full min-h-screen bg-cover bg-center font-monserrat bg-gradient-to-r from-[#1A6EB5] to-[#073CA4] overflow-hidden pt-20">
            <Navbar />

            {/* Hero Section */}
            <div className="relative text-white rounded-4xl flex flex-col-reverse lg:flex-row justify-between items-center px-6 md:px-30 mt-6 md:mt-10 py-10 md:py-14 gap-8 md:gap-10">
                <div className="text-white w-full max-w-2xl space-y-6 animate-fadeInUp text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-medium drop-shadow-lg leading-tight">
                        {`Selamat datang di ${namaStasiun} Bengkulu`}
                    </h1>
                    <p className="text-base md:text-lg font-light text-white/90 drop-shadow">
                        Silakan isi form di bawah ini sebagai tanda kehadiran
                        dan partisipasi Anda dalam kunjungan ke BMKG. Terima
                        kasih atas kunjungannya!
                    </p>
                    <Button
                        text="Mulai Isi Buku Tamu"
                        stylebutton="bg-gradient-to-r from-[#1463B0] to-[#0C3C87] hover:from-[#04419E] hover:cursor-pointer hover:to-[#032960] text-white text-sm font-semibold rounded-full shadow-lg px-6 py-3 w-full md:w-[300px] transition-all"
                        onClick={handleStart}
                    />
                </div>

                <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
                    <CarouselBeranda />
                </div>
            </div>

            {/* Statistik Kunjungan */}
            <div className="w-full max-w-screen-xl mx-auto px-4 mt-10">
                <div className="grid grid-cols-3 gap-3 md:gap-20">
                    <CardKunjungan
                        text="Tamu Hari Ini"
                        count={dataKunjungan.hariIni}
                    />
                    <CardKunjungan
                        text="Tamu Minggu Ini"
                        count={dataKunjungan.mingguIni}
                    />
                    <CardKunjungan
                        text="Tamu Bulan Ini"
                        count={dataKunjungan.bulanIni}
                    />
                </div>
            </div>

            {/* Section Informasi Digital */}
            <div className="relative w-full">
                <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full top-[100px] left-[-150px] blur-3xl z-0"></div>

                <div className="relative z-5 flex flex-col-reverse lg:flex-row w-full items-center justify-center gap-10 px-6 md:px-20 mt-10 md:mt-28 mb-10">
                    <div className="flex flex-col gap-6 pl-0 lg:pl-10 text-white max-w-xl w-full animate-fadeInUp items-center text-center lg:items-start lg:text-left">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium leading-tight drop-shadow-xl">
                            Kini Lebih{" "}
                            <span className="text-[#59A1CE]">Praktis</span> &{" "}
                            <br /> Lebih{" "}
                            <span className="text-[#59A1CE]">Cepat!</span>
                        </h1>
                        <h2 className="text-base sm:text-lg md:text-xl font-light text-white/90 drop-shadow">
                            Buku tamu BMKG kini hadir dalam versi digital —
                            tanpa repot, tanpa antre.
                        </h2>
                    </div>

                    <div className="relative group hover:scale-105 transition-all duration-500">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl z-0"></div>
                        <Image
                            src="/DesainBeranda.png"
                            alt="Logo BMKG"
                            width={863}
                            height={500}
                            className="relative w-full max-w-[863px] pl-10 drop-shadow-2xl z-10 transition-all duration-500"
                        />
                    </div>
                </div>
            </div>

            {/* Kontak & Footer */}
            <div className="w-full px-6 py-10 md:px-10 md:py-14">
                <h1 className="text-3xl sm:text-4xl font-medium text-white text-center">
                    Layanan & Informasi
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl mt-2 font-extralight text-white text-center">
                    Hubungi kami untuk keperluan kunjungan, kolaborasi, atau
                    konsultasi.
                </h2>
                <CarouselKontak />
            </div>

            <Footer />
        </div>
    );
}
