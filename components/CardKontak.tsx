import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";

export default function CardKontakMeteorologi() {
  return (
    <div className="w-full p-4 sm:p-6 md:p-10 border border-white bg-white/20 backdrop-blur-md rounded-3xl flex flex-col lg:flex-row gap-8 items-start overflow-hidden">
      {/* Info Kontak */}
      <div className="flex-1 space-y-4 max-w-xl mx-auto lg:mx-0 break-words">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white">
          Stasiun Klimatologi Bengkulu
        </h2>

        {/* Lokasi */}
        <div className="flex items-start gap-4">
          <div className="bg-gray-200 p-2 rounded-full shrink-0">
            <CiLocationOn className="w-8 h-8 sm:w-10 sm:h-10 text-blue-800" />
          </div>
          <div className="text-sm sm:text-base text-white break-words">
            <p className="font-semibold text-base sm:text-lg">
              Alamat Kantor :
            </p>
            <p className="whitespace-pre-line break-words">
              Jl. Ir. Rustandi Sugianto, Pulau Baai, Kampung Melayu, Kandang
              Mas, Kec. Km. Melayu, Kota Bengkulu, Bengkulu 38216
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="bg-gray-200 p-2 rounded-full shrink-0">
            <MdOutlineMail className="w-8 h-8 sm:w-10 sm:h-10 text-blue-800" />
          </div>
          <div className="text-sm sm:text-base text-white break-words">
            <p className="font-semibold text-base sm:text-lg">Email :</p>
            <a
              href="mailto:staklim.pulaubaai@bmkg.go.id"
              className="text-white hover:text-blue-800 hover:underline break-words"
            >
              staklim.pulaubaai@bmkg.go.id
            </a>
          </div>
        </div>

        {/* Telepon */}
        <div className="flex items-start gap-4">
          <div className="bg-gray-200 p-2 rounded-full shrink-0">
            <BsTelephone className="w-8 h-8 sm:w-10 sm:h-10 text-blue-800" />
          </div>
          <div className="text-sm sm:text-base text-white break-words">
            <p className="font-semibold text-base sm:text-lg">No Telepon :</p>
            <a
              href="https://wa.me/628117321291"
              className="text-white hover:underline break-words"
            >
              +62 811-7321-291
            </a>
          </div>
        </div>
      </div>

      {/* Peta */}
      <div className="flex-1 w-full py-4 sm:py-6 lg:py-10 flex justify-center">
        <img
          src="/MapKlimat.png"
          alt="Map Location"
          className="w-full max-w-md sm:max-w-lg rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
