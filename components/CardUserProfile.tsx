"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

import Button from "./Button";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProvinsiSelectProfile } from "./ProvinsiSelectProfile";
import { SubdistrictSelectProfile } from "./SubdistrictSelectProfile";
import { CitySelectProfile } from "./CitySelectProfile";
import { VillageSelectProfile } from "./VillageSelectProfile";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CardUserProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    "https://via.placeholder.com/150"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
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
        .then((response) => response.json())
        .then((data) => {
          console.log("Profile data:", data);
          setProfile(data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    notelp: "",
    asalPengunjung: "",
    keteranganAsal: "",
    provinsi: "",
    provinsiID: "",
    kota: "",
    kotaID: "",
    kecamatan: "",
    kecamatanID: "",
    kelurahan: "",
    kelurahanID: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        firstName: profile?.Nama_Depan_Pengunjung || "",
        lastName: profile?.Nama_Belakang_Pengunjung || "",
        email: profile?.Email_Pengunjung || "",
        password: profile?.Kata_Sandi_Pengunjung || "",
        notelp: profile?.No_Telepon_Pengunjung || "",
        asalPengunjung: profile?.Asal_Pengunjung || "",
        keteranganAsal: profile?.Keterangan_Asal_Pengunjung || "",

        alamat: profile?.Alamat?.Alamat_Jalan || "",
        provinsi: profile?.Alamat?.Provinsi || "",
        provinsiID: profile?.Alamat?.Provinsi_ID || "",
        kota: profile?.Alamat?.Kabupaten || "",
        kotaID: profile?.Alamat?.Kabupaten_ID || "",
        kecamatan: profile?.Alamat?.Kecamatan || "",
        kecamatanID: profile?.Alamat?.Kecamatan_ID || "",
        kelurahan: profile?.Alamat?.Kelurahan || "",
        kelurahanID: profile?.Alamat?.Kelurahan_ID || "",
      }));
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("id_pengunjung");

    if (!token || !userId) {
      console.error("Token atau User ID tidak ditemukan di sessionStorage");
      return;
    }

    setLoading(true);

    const data = new FormData();

    data.append("nama_depan_pengunjung", formData.firstName);
    data.append("nama_belakang_pengunjung", formData.lastName);
    data.append("email", formData.email);
    data.append("kata_sandi", formData.password);
    data.append("no_telepon_pengunjung", formData.notelp);
    data.append("asal_pengunjung", formData.asalPengunjung); // kten dengan formData

    data.append("keterangan_asal_pengunjung", formData.keteranganAsal);
    data.append("province_id", formData.provinsi);
    data.append("regency_id", formData.kota);
    data.append("district_id", formData.kecamatan);
    data.append("village_id", formData.kelurahan);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex items-start justify-center w-full py-16 bg-cover bg-center mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto bg-white backdrop-blur-lg border rounded-3xl border-neutral-200 shadow-xl px-10 py-16"
        >
          {/* Judul */}
          <h2 className="text-4xl font-semibold text-start text-blue-800 mb-10 tracking-tight antialiased">
            Profil Saya
          </h2>

          {/* Profil */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <div className="flex items-center gap-6">
              <motion.label
                htmlFor="profileImageInput"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="cursor-pointer"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-md border-2 border-white"
                />
              </motion.label>

              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />

              <div>
                <h3 className="text-3xl font-semibold text-blue-800">
                  {profile?.Nama_Depan_Pengunjung}
                </h3>

                <p className="text-sm text-neutral-500">
                  {profile?.Email_Pengunjung}
                </p>
              </div>
            </div>

            <Button
              text="Edit Poto"
              stylebutton="text-sm text-blue-800 border cursor-pointer border-neutral-300 py-2 px-6 rounded-full hover:bg-blue-800 hover:text-white transition"
              onClick={() => fileInputRef.current?.click()}
            />
          </div>

          {/* Form Editable */}
          <form className="grid grid-cols-1 gap-y-6 text-sm text-blue-800">
            {/* Baris 1: Nama Depan & Nama Belakang */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 tracking-wide">
                  Nama Depan
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nama Depan"
                  className="w-full bg-transparent border-b border-blue-300 text-blue-800 placeholder-blue-400 focus:outline-none focus:border-blue-600 px-1 py-2 text-xs transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 tracking-wide">
                  Nama Belakang
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nama Belakang"
                  className="w-full bg-transparent border-b border-blue-300 text-blue-800 placeholder-blue-400 focus:outline-none focus:border-blue-600 px-1 py-2 text-xs transition"
                />
              </div>
            </div>

            {/* Baris 2: Email & No Telepon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 tracking-wide">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-blue-300 text-blue-800 placeholder-blue-400 focus:outline-none focus:border-blue-600 px-1 py-2 text-xs transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 tracking-wide">
                  No Telepon
                </label>
                <input
                  name="notelp"
                  type="tel"
                  value={formData.notelp}
                  onChange={handleChange}
                  placeholder="No Telepon"
                  className="w-full bg-transparent border-b border-blue-300 text-blue-800 placeholder-blue-400 focus:outline-none focus:border-blue-600 px-1 py-2 text-xs transition"
                />
              </div>
            </div>

            {/* Baris 3: Kata Sandi & Asal Pengunjung */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 tracking-wide">
                  Kata Sandi
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Kata Sandi"
                  className="w-full bg-transparent border-b border-blue-300 text-blue-800 placeholder-blue-400 focus:outline-none focus:border-blue-600 px-1 py-2 text-xs transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 tracking-wide">
                  Asal Pengunjung
                </label>
                <input
                  name="asalpengunjung"
                  value={formData.asalPengunjung}
                  onChange={handleChange}
                  placeholder="Asal Pengunjung"
                  className="w-full bg-transparent border-b border-blue-300 text-blue-800 placeholder-blue-400 focus:outline-none focus:border-blue-600 px-1 py-2 text-xs ransition"
                />
              </div>
            </div>

            {/* Baris 4: Keterangan Asal Pengunjung */}
            <div>
              <label className="block text-sm font-medium mb-1 tracking-wide">
                Keterangan Asal Pengunjung
              </label>
              <input
                name="keteranganAsal"
                value={formData.keteranganAsal}
                onChange={handleChange}
                placeholder="Keterangan Asal Pengunjung"
                className="w-full bg-transparent border-b border-blue-300 text-blue-800 placeholder-blue-400 focus:outline-none focus:border-blue-600 px-1 py-2 text-xs transition"
              />
            </div>

            {/* Provinsi & Kota/Kabupaten */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 tracking-wide">
                  Provinsi
                </label>
                <ProvinsiSelectProfile
                  province={formData.provinsi}
                  setProvince={(e) => setFormData({ ...formData, provinsi: e })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 tracking-wide">
                  Kota/Kabupaten
                </label>
                <CitySelectProfile
                  city={formData.kota}
                  provinceId={formData.provinsiID}
                  setCity={(e) => setFormData({ ...formData, kota: e })}
                />
              </div>
            </div>

            {/* Kecamatan & Kelurahan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 tracking-wide">
                  Kecamatan
                </label>
                <SubdistrictSelectProfile
                  subdistrict={formData.kecamatan}
                  districtId={formData.kotaID}
                  setSubdistrict={(e) =>
                    setFormData({ ...formData, kecamatan: e })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 tracking-wide">
                  Kelurahan
                </label>
                <VillageSelectProfile
                  village={formData.kelurahan}
                  districtId={formData.kecamatanID}
                  setVillage={(e) => setFormData({ ...formData, kelurahan: e })}
                />
              </div>
            </div>
          </form>

          {/* Tombol */}
          <div className="flex flex-col  md:flex-row justify-end mt-14 gap-4">
            <motion.div whileHover={{ scale: 1.03 }}>
              <Button
                text="Batalkan"
                stylebutton="bg-neutral-200 cursor-pointer text-neutral-700 hover:bg-neutral-300 font-medium py-3 px-8 rounded-full transition w-full md:w-auto"
                onClick={() => router.push("/userprofile")}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }}>
              <Button
                text="Simpan"
                stylebutton="bg-blue-600 cursor-pointer text-white hover:bg-blue-700 font-medium py-3 px-8 rounded-full transition w-full md:w-auto"
                onClick={handleSave}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
