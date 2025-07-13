import { FaqItems } from "@/components/FaqItems";

export default function TextButtonFaq() {
  const faqs = [
    {
      question: "Apa itu buku tamu digital BMKG?",
      answer:
        "Buku tamu BMKG adalah sistem pencatatan untuk individu atau instansi yang melakukan kunjungan, permintaan informasi, atau konsultasi langsung ke kantor BMKG.",
    },
    {
      question: "Apa saja data yang diperlukan untuk mengisi buku tamu?",
      answer:
        "Nama, instansi, keperluan kunjungan, dan kontak yang bisa dihubungi.",
    },
    {
      question: "Apakah perlu surat pengantar untuk berkunjung?",
      answer: "Ya, untuk kunjungan resmi disarankan membawa surat pengantar.",
    },
    {
      question: "Apa manfaat mengisi buku tamu bagi pengunjung?",
      answer:
        "Data digunakan untuk mempermudah proses pelayanan, dokumentasi, dan pelaporan kunjungan.",
    },
    {
      question: "Apakah data dari buku tamu akan dipublikasikan?",
      answer:
        "Tidak. Data hanya digunakan untuk keperluan internal dan tetap dijaga kerahasiaannya.",
    },
  ];

  return (
    <div className="flex flex-col px-8 py-6 gap-4 bg-white rounded-2xl w-full max-w-3xl shadow-md">
      {faqs.map((faq, index) => (
        <FaqItems key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
