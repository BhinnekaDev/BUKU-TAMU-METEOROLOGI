"use client";

import { useState } from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export function FaqItems({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full  border-blue-200 pb-1">
      <div
        className="cursor-pointer flex items-center justify-between text-[#1967B6] font-bold text-left py-3 pl-12 pr-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Ikon chat */}
        <LuMessageCircleMore className="absolute left-0 top-4 w-[24px] h-[24px]" />

        {/* Pertanyaan */}
        <span>{question}</span>

        {/* Panah */}
        {isOpen ? (
          <IoIosArrowUp className="w-6 h-6 text-[#1967B6]" />
        ) : (
          <IoIosArrowDown className="w-6 h-6 text-[#1967B6]" />
        )}
      </div>
      {isOpen && (
        <p className="text-[#1967B6] text-left pl-12 pr-10">{answer}</p>
      )}
    </div>
  );
}
