"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface ProvinsiSelectProps {
  province: string;
  setProvince: (value: string) => void;
}

export const ProvinsiSelect: React.FC<ProvinsiSelectProps> = ({
  province,
  setProvince,
}) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
        );
        const data = await res.json();
        const mapped = data.map((prov: any) => ({
          value: prov.id,
          label: prov.name,
        }));
        setOptions(mapped);
      } catch (error) {
        console.error("Gagal mengambil data provinsi", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  return (
    <Select
      isLoading={loading}
      options={options}
      value={options.find((item) => item.value === province) || null}
      onChange={(selected) => setProvince(selected?.value || "")}
      placeholder="Pilih Provinsi..."
      noOptionsMessage={() => "Provinsi tidak ditemukan"}
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
          display: "flex",
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "0 0.25rem",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          display: "flex",
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
          color: "#FFFFFF",
          fontSize: "0.75rem",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }),
        singleValue: (base) => ({
          ...base,
          color: "#FFFFFF",
          fontSize: "0.75rem",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }),
        input: (base) => ({
          ...base,
          color: "#FFFFFF",
          fontSize: "0.75rem",
          margin: 0,
          padding: 0,
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
