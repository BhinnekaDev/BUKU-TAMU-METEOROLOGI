import React from "react";
import Button from "./Button";

export default function NotifikasiUpdateProfile() {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-b from-[#1A6EB5] to-[#023193] rounded-4xl w-[610px] h-[495px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-25 h-25 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-xl mb-4 text-white">
        Perubahan profil berhasil disimpan
      </p>
      <Button
        text="OKE"
        stylebutton="bg-white text-blue-800 rounded-full px-15 py-2 font-semibold hover:bg-blue-100 transition"
      />
    </div>
  );
}
