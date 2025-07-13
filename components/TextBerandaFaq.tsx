import { FaqItems } from "@/components/FaqItems";

export default function TextBerandaFaq() {
  const faqs = [
    {
      question:
        "Bagaimana cara memulai pengisian buku tamu dari halaman beranda?",
      answer:
        "Klik tombol “Mulai Isi Buku Tamu” yang tersedia di tengah atau bawah halaman beranda untuk masuk ke formulir pengisian data.",
    },
    {
      question: "Apakah saya harus login terlebih dahulu di beranda?",
      answer: "Ya, Pengunjung harus melakukan login terlebih dahulu",
    },
    {
      question:
        "Apa yang harus saya lakukan jika sistem tidak merespons saat di halaman beranda?",
      answer:
        "Silakan coba refresh halaman, gunakan browser terbaru, atau hubungi petugas BMKG yang bertugas di meja resepsionis.",
    },
    {
      question:
        "Apa yang ditampilkan di halaman beranda Buku Tamu Digital BMKG?",
      answer:
        "Halaman beranda menampilkan informasi umum seperti sambutan BMKG, panduan pengisian buku tamu, serta tombol untuk memulai proses registrasi.",
    },
    {
      question:
        "Apakah Buku Tamu Digital BMKG bisa diakses dari perangkat pribadi saya?",
      answer:
        "Ya. Jika tersedia versi online, Anda bisa mengakses beranda Buku Tamu Digital BMKG dari laptop melalui link yang disediakan.",
    },
  ];

  return (
    <div className="flex flex-col mx-auto px-10 py-2 font-[var(--font-monserrat)] bg-white text-medium rounded-2xl w-full max-w-3xl shadow-md">
      {faqs.map((faq, index) => (
        <FaqItems key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
