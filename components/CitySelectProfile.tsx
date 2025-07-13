"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface CitySelectProps {
  provinceId: string;
  city: string;
  setCity: (value: string) => void;
}

export const CitySelectProfile: React.FC<CitySelectProps> = ({
  provinceId,
  city,
  setCity,
}) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!provinceId) {
      setOptions([]);
      return;
    }

    const fetchCities = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
        );
        const data = await res.json();

        const mapped = data.map((city: any) => ({
          value: city.id,
          label: city.name,
        }));

        setOptions(mapped);
      } catch (error) {
        console.error("Gagal mengambil data kota/kabupaten", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [provinceId]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Hindari render di server

  return (
    <Select
      isLoading={loading}
      options={options}
      value={options.find((item) => item.label === city) || null}
      onChange={(selected) => setCity(selected?.label || "")}
      placeholder={city ? "" : "Pilih Provinsi..."}
      noOptionsMessage={() => "Kota/Kabupaten tidak ditemukan"}
      loadingMessage={() => "Memuat..."}
      isClearable
      className="w-full text-xs"
      classNamePrefix="react-select"
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "white",
          border: "none",
          boxShadow: "none",
          fontSize: "0.75rem",
          minHeight: "2.2rem",
          padding: "0 0.5rem",
          overflow: "hidden",
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "0 0.25rem",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          fontSize: "0.75rem",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
          zIndex: 100,
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused
            ? "#f0f0f0"
            : state.isSelected
            ? "#e0e7ff"
            : "#fff",
          color: "#blue",
          fontSize: "0.75rem",
          padding: "0.4rem 0.75rem",
        }),
        placeholder: (base) => ({
          ...base,
          color: "#blue",
          fontSize: "0.75rem",
        }),
        singleValue: (base) => ({
          ...base,
          color: "#blue",
          fontSize: "0.75rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }),
        input: (base) => ({
          ...base,
          color: "#blue",
          fontSize: "0.75rem",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          padding: "2px",
        }),
        clearIndicator: (base) => ({
          ...base,
          padding: "2px",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
      }}
    />
  );
};
