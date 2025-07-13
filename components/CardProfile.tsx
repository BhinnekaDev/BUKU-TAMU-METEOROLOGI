"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function ProfileCard({ onClose }: Props) {
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [profile, setProfile] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string>(
    "https://via.placeholder.com/150"
  );

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("id_pengunjung");

    if (!token || !userId) {
      console.error("Token atau User ID tidak ditemukan di sessionStorage");
      return;
    }

    fetch(`${API_BASE_URL}/api/pengunjung/profile`, {
      method: "GET",
      headers: {
        accept: "*/*",
        access_token: token,
        user_id: userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile data:", data);
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  useEffect(() => {
    if (profile && profile.foto_profil) {
      setProfileImage(profile.foto_profil);
    }
  }, [profile]);

  const handleClick = () => {};
  const handleLogout = async () => {
    // Hapus semua data sessionStorage
    sessionStorage.clear();
    router.push("/");
  };

  const handleKelola = () => {
    router.push("/userprofile");
  };

  const handleRiwayatSaya = () => {
    router.push("/halamanriwayat");
  };

  return (
    <div className="relative w-[300px] bg-blue-900 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center text-white">
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-4 right-4 text-white hover:text-gray-300 text-xl"
      >
        ✕
      </button>

      {/* FOTO PROFIL */}
      <div
        onClick={handleClick}
        className="relative mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-white cursor-pointer"
      >
        <img
          src={profileImage}
          alt="Foto Profil"
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-sm text-blue-100 underline mt-2">
        {profile?.Email_Pengunjung}
      </p>
      <h3 className="text-xl font-semibold mt-1">
        Hello, {profile?.Nama_Depan_Pengunjung}
      </h3>

      <button
        onClick={handleKelola}
        className="mt-2 px-4 py-1 border border-white rounded-full text-sm cursor-pointer hover:bg-white hover:text-blue-800 transition"
      >
        Kelola Profil Saya
      </button>

      <button
        onClick={handleRiwayatSaya}
        className="mt-2 px-4 py-1 border border-white rounded-full text-sm hover:bg-white cursor-pointer hover:text-blue-800 transition"
      >
        Riwayat Buku Tamu
      </button>

      <button
        onClick={handleLogout}
        className="mx-auto mt-4 flex items-center justify-center gap-2 text-sm text-white cursor-pointer hover:text-red-300 transition"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}
