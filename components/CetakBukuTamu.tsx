import React, { forwardRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type CetakProps = {
  data: {
    nama: string;
    jabatan: string;
    instansi: string;
    tanggal: string;
    waktu: string;
  };
  elementId?: string;
};

const CetakBukuTamu = forwardRef(
  ({ data, elementId = "pdf-content" }: CetakProps, ref) => {
    const generatePDF = async () => {
      const input = document.getElementById(elementId);
      if (!input) return;

      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("buku-tamu-bmkg.pdf");
    };

    // Allow parent to trigger generatePDF
    useImperativeHandle(ref, () => ({
      triggerDownload: () => generatePDF(),
    }));

    return (
      <div
        id={elementId}
        className="w-[210mm] h-auto p-8 bg-white text-black shadow border"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <div className="flex justify-between items-center mb-4">
          <img src="/bmkg-logo.png" alt="BMKG Logo" className="w-20" />
          <div className="text-right">
            <h1 className="text-xl font-bold">
              Badan Meteorologi Klimatologi dan Geofisika
            </h1>
            <p>Stasiun Klimatologi Bengkulu</p>
          </div>
        </div>

        <hr className="border-t border-gray-400 my-4" />

        <h2 className="text-lg font-semibold mb-2 text-center">
          Formulir Buku Tamu
        </h2>

        <table className="w-full text-left table-auto">
          <tbody>
            <tr>
              <td className="font-semibold w-40">Nama</td>
              <td>: {data.nama}</td>
            </tr>
            <tr>
              <td className="font-semibold">Jabatan</td>
              <td>: {data.jabatan}</td>
            </tr>
            <tr>
              <td className="font-semibold">Instansi</td>
              <td>: {data.instansi}</td>
            </tr>
            <tr>
              <td className="font-semibold">Tanggal</td>
              <td>: {data.tanggal}</td>
            </tr>
            <tr>
              <td className="font-semibold">Waktu</td>
              <td>: {data.waktu}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-10 text-right">
          <p className="mb-12">Tanda Tangan,</p>
          <p>_____________________</p>
        </div>
      </div>
    );
  }
);

export default CetakBukuTamu;
