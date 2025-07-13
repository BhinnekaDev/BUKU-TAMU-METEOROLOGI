"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Button from "@/components/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type FormData = {
  nama: string;
  jabatan: string;
  kantor: string;
  keperluan: string;
  tanggal: string;
  jam: string;
  tujuanStasiun: string;
  status: "Diterima" | "Ditinjau" | "Ditolak";
};

export default function CardKonfirmasi() {
  const router = useRouter();
  const pdfRef = useRef<HTMLDivElement>(null); // <- referensi untuk div yang akan dicetak

  const [data] = useState<FormData>({
    nama: "Anugrah Maulana",
    jabatan: "Videografer",
    kantor: "Grahh Creative",
    keperluan: "Dokumentasi Kegiatan",
    tanggal: "5 Juni 2025",
    jam: "10:00 WIB",
    tujuanStasiun: "Stasiun Bandung",
    status: "Ditinjau",
  });

  const statusColor = {
    Diterima: "text-green-600",
    Ditinjau: "text-yellow-600",
    Ditolak: "text-red-600",
  };

  const handleCetak = async () => {
    if (pdfRef.current === null) return;
    const element = pdfRef.current;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("bukti-kunjungan.pdf");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-40">
      <div ref={pdfRef} className="bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 tracking-wide">
          TAMU MENDATANG
        </h2>
        <div className="border-t border-blue-200 mb-8" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-8">
          <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg">
            <img
              src="/PotoProfile.png"
              alt="Foto Profil"
              className="w-full object-cover"
            />
          </div>

          <div className="text-center md:text-left space-y-1 w-full">
            <h3 className="text-4xl font-bold text-blue-900">{data.nama}</h3>
            <p className="text-xl text-gray-700">{data.jabatan}</p>
            <p className="text-lg text-gray-500">{data.kantor}</p>

            <div className="mt-3">
              <p className="text-md text-gray-600 italic">Keperluan:</p>
              <p className="text-lg text-gray-700 font-medium">
                {data.keperluan}
              </p>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <p className="text-blue-800 font-semibold">{data.tanggal}</p>
              <span className="text-blue-700 font-medium">•</span>
              <p className="text-blue-700 font-medium">{data.jam}</p>
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600 italic">Tujuan Stasiun:</p>
              <p className="text-lg text-gray-700 font-medium">
                {data.tujuanStasiun}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600 italic">Status:</p>
              <p
                className={`text-lg font-semibold ${statusColor[data.status]}`}
              >
                {data.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          text="KEMBALI KE BERANDA"
          stylebutton="flex-1 bg-blue-800 cursor-pointer hover:bg-blue-900 text-white font-semibold py-3 rounded-full shadow-md transition"
          onClick={() => router.push("/beranda")}
        />
        <Button
          text="CETAK BUKTI KUNJUNGAN"
          stylebutton="flex-1 bg-blue-800 cursor-pointer hover:bg-blue-900 text-white font-semibold py-3 rounded-full shadow-md transition"
          onClick={handleCetak}
        />
      </div>
    </div>
  );
}
