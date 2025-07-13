"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import jsPDF from "jspdf";

type RiwayatData = {
  id: string;
  tujuan: string;
  waktu_kunjungan: string;
  tanda_tangan: string;
  stasiun: string;
  status: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RiwayatBukuTamuSaya() {
  const router = useRouter();
  const [data, setData] = useState<RiwayatData[] | null>(null);
  const [stasiun, setStasiun] = useState<string | null>(null);

  const downloadPDF = async (item: RiwayatData) => {
    const doc = new jsPDF();

    // Ambil data pengunjung dari sessionStorage
    const pengunjungStr = sessionStorage.getItem("pengunjung");
    const pengunjung = pengunjungStr ? JSON.parse(pengunjungStr) : {};

    // Header
    doc.setFillColor(30, 64, 175); // Biru tua
    doc.rect(0, 0, 210, 30, "F");

    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); // Putih
    doc.text("BUKTI KUNJUNGAN BUKU TAMU", 105, 18, { align: "center" });

    // Body
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Hitam

    let y = 40;
    const lineHeight = 10;

    const drawLabelValue = (label: string, value: string) => {
      doc.setFont("bold");
      doc.text(`${label}:`, 20, y);
      doc.setFont("normal");
      doc.text(value || "-", 60, y);
      y += lineHeight;
    };

    // Data dari sessionStorage (pengunjung)
    drawLabelValue("Nama", pengunjung.nama);
    drawLabelValue("Email", pengunjung.email);
    drawLabelValue("No. HP", pengunjung.no_hp);
    drawLabelValue("Instansi", pengunjung.instansi);

    // Data dari item (riwayat)
    drawLabelValue("Tujuan", item.tujuan);
    drawLabelValue("Waktu Kunjungan", item.waktu_kunjungan);
    drawLabelValue("Stasiun", item.stasiun);
    drawLabelValue("Status", item.status);

    // Garis pemisah
    doc.setDrawColor(180);
    doc.line(20, y + 5, 190, y + 5);
    y += 15;

    // Tanda Tangan
    if (item.tanda_tangan?.startsWith("data:image")) {
      doc.text("Tanda Tangan:", 20, y);
      doc.addImage(item.tanda_tangan, "PNG", 20, y + 5, 60, 30);
    }

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      "Dicetak secara otomatis melalui sistem Buku Tamu Digital",
      20,
      290
    );

    // Simpan PDF
    doc.save(`buku_tamu_${item.id}.pdf`);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window === "undefined") return;

      const token = window.sessionStorage.getItem("token");
      const userId = window.sessionStorage.getItem("id_pengunjung");
      const stationName = window.sessionStorage.getItem("nama_stasiun");

      if (!token || !userId) {
        console.warn("Token atau User ID tidak ditemukan di sessionStorage.");
        setData(null);
        return;
      }

      setStasiun(stationName ?? "-");

      // lanjut fetch seperti biasa

      try {
        const res = await fetch(`${API_BASE_URL}/api/pengunjung/riwayat`, {
          headers: {
            accept: "*/*",
            access_token: token,
            user_id: userId,
          },
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data");
        }

        const json = await res.json();

        if (json.status === "success" && json.data.length > 0) {
          setData(json.data);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Terjadi kesalahan saat mengambil data:", err);
        setData(null);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="w-full max-w-xl mx-auto mt-60 p-6 bg-white rounded-3xl shadow-md text-center text-gray-600">
        <p>Sedang memuat data...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto mt-60 p-6 bg-white rounded-3xl shadow-md text-center text-gray-600">
        <p>Data tidak ditemukan. Silakan isi formulir terlebih dahulu.</p>
        <Button
          text="Kembali ke Form"
          stylebutton="mt-4 bg-blue-800 text-white py-2 px-5 rounded-full shadow-md hover:bg-blue-900 transition"
          onClick={() => router.push("/")}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-32 px-6 md:px-10 py-12 bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200 shadow-2xl rounded-3xl">
      <h2 className="text-4xl font-medium text-blue-900 tracking-wide">
        Riwayat Buku Tamu Saya
      </h2>

      <p className="mt-2 text-gray-600 mb-10">
        Berikut adalah daftar kunjungan Anda.
      </p>

      <div className="space-y-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-xl shadow-md border border-blue-100 flex flex-col md:flex-row gap-4 items-center"
          >
            <img
              src={item.tanda_tangan}
              alt="Tanda Tangan"
              className="w-32 h-32 object-contain border rounded-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg font-semibold text-blue-700">
                {item.tujuan}
              </p>
              <p className="text-sm text-gray-600">{item.waktu_kunjungan}</p>
              <p className="text-sm text-gray-400 italic">{item.stasiun}</p>
              <p className="text-sm text-gray-400">{item.status}</p>
            </div>
            <Button
              text="Download PDF"
              stylebutton="bg-blue-800 text-white py-2 px-5 rounded-full cursor-pointer shadow-md hover:bg-blue-900 transition"
              onClick={() => downloadPDF(item)}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-10">
        <Button
          text="Kembali ke Beranda"
          stylebutton="bg-gradient-to-r from-blue-700 cursor-pointer to-blue-900 hover:brightness-110 text-white font-semibold py-3 rounded-xl shadow-md transition"
          onClick={() => router.push("/beranda")}
        />
      </div>
    </div>
  );
}
