import { FaqItems } from "@/components/FaqItems";

export default function TextFormFaq() {
  const faqs = [
    {
      question:
        "Apa saja data yang harus saya isi dalam Buku Tamu Digital BMKG?",
      answer:
        "Anda perlu mengisi nama depan, nama belakang, alamat email, nomor telepon, tujuan stasiun yang akan dikunjungi, asal instansi atau dinas, alamat, keterangan tujuan kunjungan, waktu kunjungan, dan memberikan tanda tangan digital.",
    },
    {
      question: "Mengapa saya harus mengisi data secara lengkap?",
      answer:
        "Data lengkap digunakan untuk keperluan pencatatan, keamanan, serta mempermudah proses verifikasi dan rekapitulasi kunjungan di lingkungan BMKG.",
    },
    {
      question: "Bagaimana cara mengisi waktu kunjungan?",
      answer:
        "Waktu kunjungan biasanya terisi otomatis saat Anda mengakses formulir, namun Anda juga bisa memilih atau mengubah waktu secara manual jika diperlukan.",
    },
    {
      question:
        "Bagaimana jika saya tidak memiliki instansi atau datang secara pribadi?",
      answer:
        "Anda bisa memilih atau menuliskan opsi seperti 'Perorangan' atau 'Pribadi' pada bagian asal instansi.",
    },
    {
      question: "Apakah saya harus menandatangani secara digital?",
      answer:
        "Ya, tanda tangan digital diperlukan sebagai bentuk verifikasi dan persetujuan atas data kunjungan yang Anda isi.",
    },
    {
      question: "Apakah saya bisa mengubah data setelah mengisi formulir?",
      answer:
        "Data hanya bisa diubah selama Anda belum mengirimkan atau menyimpan formulir. Jika sudah disimpan, hubungi petugas untuk melakukan perubahan.",
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
