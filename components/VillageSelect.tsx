"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface VillageSelectProps {
  districtId: string;
  village: string;
  setVillage: (value: string) => void;
}

export const VillageSelect: React.FC<VillageSelectProps> = ({
  districtId,
  village,
  setVillage,
}) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!districtId) {
      setOptions([]);
      return;
    }

    const fetchVillage = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
        );
        const data = await res.json();
        const mapped = data.map((vill: any) => ({
          value: vill.id,
          label: vill.name,
        }));
        setOptions(mapped);
      } catch (error) {
        console.error("Gagal mengambil data desa/kelurahan", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVillage();
  }, [districtId]);

  return (
    <Select
      isLoading={loading}
      options={options}
      value={options.find((item) => item.value === village) || null}
      onChange={(selected) => setVillage(selected?.value || "")}
      placeholder="Pilih Desa/Kelurahan..."
      noOptionsMessage={() => "Desa/Kelurahan tidak ditemukan"}
      loadingMessage={() => "Memuat..."}
      isClearable
      className="w-full text-xs"
      classNamePrefix="react-select"
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "transparent",
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
          color: "#111827",
          fontSize: "0.75rem",
          padding: "0.4rem 0.75rem",
        }),
        placeholder: (base) => ({
          ...base,
          color: "#9ca3af",
          fontSize: "0.75rem",
        }),
        singleValue: (base) => ({
          ...base,
          color: "#FFFFF",
          fontSize: "0.75rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }),
        input: (base) => ({
          ...base,
          color: "#FFFFF",
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
