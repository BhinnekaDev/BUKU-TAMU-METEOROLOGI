"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import SignatureCanvas from "react-signature-canvas";
import Button from "@/components/Button";

function formatWaktuKunjungan(date: Date): string {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const dayName = days[date.getDay()];
  const tanggal = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  const jamFormatted = format(date, "HH.mm");
  return `${dayName}, ${tanggal} ${monthName} ${year}, ${jamFormatted}`;
}

export default function CardFormMeteorologi() {
  const router = useRouter();
  const signatureRef = useRef<SignatureCanvas>(null);
  const idStasiun = "f72d6a9f-4c33-4de6-a6b1-4318ac658f70"; // ID Stasiun Meteorologi

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [alamat, setAlamat] = useState("");
  const [hasSigned, setHasSigned] = useState(false);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [dataBukuTamu, setDataBukuTamu] = useState({
    Nama_Depan_Pengunjung: "",
    Nama_Belakang_Pengunjung: "",
    Email_Pengunjung: "",
    No_Telepon_Pengunjung: "",
  });

  const [formData, setFormData] = useState({
    asalpengunjung: "",
    keteranganAsal: "",
    tujuan: "",
  });

  useEffect(() => {
    setSelectedDate(new Date());
    const stored = sessionStorage.getItem("dataBukuTamu");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDataBukuTamu(parsed);
    }
  }, []);

  const isFormValid = () =>
    alamat.trim() !== "" &&
    selectedDate !== null &&
    formData.asalpengunjung.trim() !== "" &&
    formData.keteranganAsal.trim() !== "" &&
    formData.tujuan.trim() !== "" &&
    hasSigned &&
    signatureFile !== null &&
    dataBukuTamu.Email_Pengunjung.trim() !== "";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "alamat") {
      setAlamat(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Lengkapi semua data terlebih dahulu.");
      return;
    }

    const waktu_kunjungan = formatWaktuKunjungan(selectedDate!);

    const form = new FormData();
    form.append("Nama_Depan_Pengunjung", dataBukuTamu.Nama_Depan_Pengunjung);
    form.append(
      "Nama_Belakang_Pengunjung",
      dataBukuTamu.Nama_Belakang_Pengunjung
    );
    form.append("Email_Pengunjung", dataBukuTamu.Email_Pengunjung);
    form.append("No_Telepon_Pengunjung", dataBukuTamu.No_Telepon_Pengunjung);
    form.append("id_stasiun", idStasiun);
    form.append("Asal_Pengunjung", formData.asalpengunjung);
    form.append("Keterangan_Asal_Pengunjung", formData.keteranganAsal);
    form.append("Alamat_Lengkap", alamat);
    form.append("tujuan", formData.tujuan);
    form.append("waktu_kunjungan", waktu_kunjungan);
    form.append("tanda_tangan", signatureFile!, "tanda_tangan.png");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pengunjung/isi-buku-tamu`,
        { method: "POST", body: form }
      );
      if (response.ok) {
        setShowModal(true);
      } else {
        const err = await response.text();
        console.error("Gagal:", err);
        alert("Gagal mengirim data.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6">
        <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden flex-col md:flex-row">
          <div className="hidden md:block w-full md:w-1/2">
            <img
              src="/BgLogin.png"
              alt="Gedung BMKG"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
              Yuk, Isi Buku Tamu Dulu!
            </h1>
            <p className="text-sm text-blue-800 mb-6 sm:mb-8">
              Data kunjungan kamu membantu kami memberikan pelayanan yang lebih
              baik dan tertata.
            </p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Asal & Waktu */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label className="text-sm text-blue-800 font-medium mb-1 block">
                    Asal Pengunjung
                  </label>
                  <select
                    name="asalpengunjung"
                    value={formData.asalpengunjung}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-sm border border-blue-300 rounded-lg text-blue-800"
                    required
                  >
                    <option value="" disabled>
                      Pilih Asal
                    </option>
                    <option value="Dinas">Dinas</option>
                    <option value="BMKG">BMKG</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="text-sm text-blue-800 font-medium mb-1 block">
                    Waktu Kedatangan
                  </label>
                  <div className="w-full px-3 py-1.5 text-sm border border-blue-300 rounded-lg bg-gray-100 text-blue-800">
                    {selectedDate
                      ? formatWaktuKunjungan(selectedDate)
                      : "Memuat..."}
                  </div>
                </div>
              </div>

              {/* Alamat */}
              <div>
                <label className="text-sm text-blue-800 font-medium mb-1">
                  Alamat
                </label>
                <textarea
                  name="alamat"
                  value={alamat}
                  onChange={handleChange}
                  placeholder="Masukkan alamat lengkap"
                  rows={2}
                  className="w-full px-4 py-2 text-sm border border-blue-300 rounded-xl text-blue-800"
                  required
                />
              </div>

              {/* Keterangan Asal */}
              <div>
                <label className="text-sm text-blue-800 font-medium mb-1">
                  Keterangan Asal
                </label>
                <textarea
                  name="keteranganAsal"
                  value={formData.keteranganAsal}
                  onChange={handleChange}
                  placeholder="Contoh: Perwakilan dari Dishub Jawa Barat"
                  rows={2}
                  className="w-full px-4 py-2 text-sm border border-blue-300 rounded-xl text-blue-800"
                  required
                />
              </div>

              {/* Tujuan */}
              <div>
                <label className="text-sm text-blue-800 font-medium mb-1">
                  Tujuan Kunjungan
                </label>
                <textarea
                  name="tujuan"
                  value={formData.tujuan}
                  onChange={handleChange}
                  placeholder="Contoh: Mengikuti rapat koordinasi"
                  rows={2}
                  className="w-full px-4 py-2 text-sm border border-blue-300 rounded-xl text-blue-800"
                  required
                />
              </div>

              {/* Tanda Tangan */}
              <div>
                <label className="text-sm text-blue-800 font-medium mb-1">
                  Tanda Tangan Langsung
                </label>
                <div className="border border-blue-300 rounded-xl overflow-hidden">
                  <SignatureCanvas
                    penColor="black"
                    ref={signatureRef}
                    onEnd={() => {
                      const isEmpty = signatureRef.current?.isEmpty();
                      if (isEmpty) {
                        setHasSigned(false);
                        setSignatureFile(null);
                      } else {
                        const canvas = signatureRef.current?.getCanvas();
                        canvas?.toBlob((blob) => {
                          if (blob) {
                            setSignatureFile(
                              new File([blob], "tanda_tangan.png", {
                                type: "image/png",
                              })
                            );
                            setHasSigned(true);
                          }
                        }, "image/png");
                      }
                    }}
                    canvasProps={{ className: "w-full h-36 sm:h-40 bg-white" }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    signatureRef.current?.clear();
                    setHasSigned(false);
                    setSignatureFile(null);
                  }}
                  className="mt-2 text-xs text-blue-700 underline hover:text-blue-900"
                >
                  Hapus Tanda Tangan
                </button>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-4 mt-4">
                <Button
                  type="button"
                  text="Batalkan"
                  onClick={() => router.push("/")}
                  stylebutton="bg-blue-900 text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-blue-800 w-full sm:w-auto"
                />
                <Button
                  type="submit"
                  text="Kirim"
                  disabled={!isFormValid()}
                  stylebutton={`bg-blue-900 text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-blue-800 w-full sm:w-auto ${
                    !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Terima Kasih */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              Terima Kasih!
            </h2>
            <p className="text-blue-800 mb-4">
              Data buku tamu kamu berhasil dikirim.
            </p>
            <Button
              text="Kembali ke Beranda"
              onClick={() => router.push("/")}
              stylebutton="bg-blue-700 text-white cursor-pointer font-semibold py-2 px-4 rounded-xl hover:bg-blue-800 w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
