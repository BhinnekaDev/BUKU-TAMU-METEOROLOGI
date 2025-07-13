import { FaqItems } from "@/components/FaqItems";

export default function TextBarcodeFaq() {
  const faqs = [
    {
      question: "Apa fungsi QR Barcode dalam Buku Tamu Digital BMKG?",
      answer:
        "QR Barcode digunakan untuk memudahkan pengunjung mengakses formulir digital tanpa harus menulis manual. Cukup dengan memindai barcode menggunakan kamera ponsel.",
    },
    {
      question: "Bagaimana cara memindai QR Barcode tersebut?",
      answer:
        "Anda cukup membuka kamera ponsel atau aplikasi pemindai QR, arahkan ke barcode yang tersedia, dan tautan menuju formulir akan muncul secara otomatis.",
    },
    {
      question:
        "Apa yang harus saya lakukan jika ponsel saya tidak bisa scan QR?",
      answer:
        "Anda dapat meminta bantuan petugas atau menggunakan perangkat yang telah disediakan di meja tamu, seperti tablet atau komputer.",
    },
    {
      question: "Apakah saya perlu aplikasi khusus untuk memindai QR Barcode?",
      answer:
        "Tidak, kebanyakan ponsel modern bisa langsung membaca QR dari kamera. Namun, jika tidak muncul, Anda bisa gunakan aplikasi pemindai QR gratis dari toko aplikasi.",
    },
    {
      question: "Apakah QR Barcode selalu sama setiap hari?",
      answer:
        "Biasanya QR tetap sama jika diarahkan ke satu formulir tetap. Namun, untuk acara khusus atau keperluan tertentu, QR bisa diperbarui secara berkala.",
    },
  ];

  return (
    <div className="flex flex-col mx-auto px-10 py-2 font-[var(--font-monserrat)] text-medium bg-white rounded-2xl w-full max-w-3xl shadow-md">
      {faqs.map((faq, index) => (
        <FaqItems key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
