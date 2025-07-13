"use client";
import { useState } from "react";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";
import Button from "@/components/Button";

export default function KepuasanModal({ onClose }: { onClose: () => void }) {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState<string>("");

  const handleKirim = () => {
    if (!rating) {
      alert("Silakan pilih tingkat kepuasan terlebih dahulu.");
      return;
    }
    alert(`Terima kasih atas penilaian Anda: ${rating}`);
    onClose(); // Tutup modal dan redirect ditangani dari parent
  };

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md mx-4 p-6 rounded-2xl shadow-xl animate-fade-in">
        {!showRating ? (
          <>
            <h2 className="text-xl font-bold text-blue-900 mb-4 text-center">
              Terima kasih telah mengisi buku tamu digital BMKG.
            </h2>
            <Button
              text="Next"
              onClick={() => setShowRating(true)}
              stylebutton="bg-blue-900 text-white w-full font-semibold py-2 px-4 rounded-xl hover:bg-blue-800 transition"
            />
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-blue-900 mb-4 text-center">
              Bagaimana Kepuasan Anda Terhadap Pelayanan Kami?
            </h2>
            <div className="flex justify-around text-blue-700 text-3xl mb-6">
              <button
                onClick={() => setRating("Puas")}
                className={`hover:scale-110 transition flex flex-col items-center ${
                  rating === "Puas" ? "text-green-600" : ""
                }`}
              >
                <FaSmile />
                <span className="text-sm mt-1">Puas</span>
              </button>

              <button
                onClick={() => setRating("Cukup")}
                className={`hover:scale-110 transition flex flex-col items-center ${
                  rating === "Cukup" ? "text-yellow-500" : ""
                }`}
              >
                <FaMeh />
                <span className="text-sm mt-1">Cukup</span>
              </button>

              <button
                onClick={() => setRating("Kurang")}
                className={`hover:scale-110 transition flex flex-col items-center ${
                  rating === "Kurang" ? "text-red-500" : ""
                }`}
              >
                <FaFrown />
                <span className="text-sm mt-1">Kurang</span>
              </button>
            </div>
            <Button
              text="Kirim Penilaian"
              onClick={handleKirim}
              stylebutton="bg-blue-900 text-white w-full font-semibold py-2 px-4 rounded-xl hover:bg-blue-800 transition"
            />
          </>
        )}
      </div>
    </div>
  );
}
