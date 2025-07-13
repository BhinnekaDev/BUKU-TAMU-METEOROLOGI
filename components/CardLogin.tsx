import React from "react";

export default function CardLogin({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center min-h-screen items-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-[900px] bg-gradient-to-b from-[#1A6EB5] to-[#073CA4] h-auto md:h-[617px] rounded-3xl overflow-hidden shadow-lg">
        {/* Bagian Form */}
        <div className="w-full md:w-1/2 text-white flex flex-col justify-center items-center px-6 py-10 md:px-10">
          {children}
        </div>

        {/* Bagian Gambar */}
        <div className="w-full md:w-1/2 flex justify-center items-center overflow-hidden rounded-b-3xl md:rounded-l-3xl md:rounded-b-none">
          <img
            src="/BgLogin.png"
            alt="BgLogin"
            className="w-full h-[250px] md:h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
